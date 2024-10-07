import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

const roomHandler = (io, socket) => {
  const createRoom = async () => {
    try {
      // Create temp user
      let user = await prisma.user.findUnique({
        where: {
          email: "temp@example.com",
        },
      });

      if (!user) {
        const hashedPassword = await bcrypt.hash("password", 10);
        user = await prisma.user.create({
          data: {
            email: "temp@example.com",
            password: hashedPassword,
          },
        });
      }

      // Create a new room
      let room = await prisma.room.findUnique({
        where: {
          code: "abc",
        },
      });

      if (!room) {
        room = await prisma.room.create({
          data: {
            hostId: user.id,
            code: "abc",
          },
        });
      }

      socket.emit("roomCreated", room);
    } catch (error) {
      console.error("Error creating room:", error);
      socket.emit("error", { message: "Could not create room." });
    }
  };

  const joinRoom = async ({ roomCode }) => {
    try {
      const room = await prisma.room.findUnique({
        where: {
          code: roomCode,
        },
        include: {
          songs: {
            orderBy: {
              voteCount: 'desc',
            },
          },
          currentSong: true,
        },
      });

      if (!room) {
        socket.emit("error", { message: "Room does not exist" });
        return;
      }

      socket.join(room.id);
      socket.emit("roomData", room);
    } catch (error) {
      console.error("Error joining room:", error);
      socket.emit("error", { message: "Could not join room." });
    }
  };

  const addSong = async ({ roomCode, newSong }) => {
    try {
      const room = await prisma.room.findUnique({
        where: {
          code: roomCode,
        },
        include: {
          songs: {
            orderBy: {
              voteCount: 'desc',
            },
          },
          currentSong: true,
        },
      });

      if (!room) {
        socket.emit("error", { message: "Room does not exist" });
        return;
      }

      const userSongCount = await prisma.song.count({
        where: {
          rooms: {
            some: {
              id: room.id,
            },
          },
          addedById: newSong.addedById,
        },
      });

      // Check if the user has already added 2 songs
      if (userSongCount >= 2) {
        socket.emit("error", { message: "You have already added 2 songs" });
        return;
      }

      // Add the new song to the database
      const song = await prisma.song.create({
        data: {
          src: newSong.src,
          title: newSong.title,
          artist: newSong.artist,
          addedById: newSong.addedById,
        },
      });

      // Set the current song if it's the first song
      if (room.songs.length === 0 && room.currentSong === null) {
        await prisma.room.update({
          where: {
            id: room.id,
          },
          data: {
            currentSongId: song.id,
          },
        });
      } else {
        // Connect the new song to the room
        await prisma.room.update({
          where: {
            id: room.id,
          },
          data: {
            songs: {
              connect: {
                id: song.id,
              },
            },
          },
        });
      }

      // Fetch updated room data after the song addition
      const roomData = await prisma.room.findUnique({
        where: {
          code: roomCode,
        },
        include: {
          songs: {
            orderBy: {
              voteCount: 'desc',
            },
          },
          currentSong: true,
        },
      });

      // Emit the updated room data to all clients in the room
      io.in(room.id).emit("roomData", roomData);
      socket.emit("success", { message: "Song added successfully" });
    } catch (error) {
      console.error("Error adding song:", error);
      socket.emit("error", { message: "Could not add song." });
    }
  };

  // Upvote or Downvote a song
  const voteSong = async (songData) => {
    try {
      const newValue = songData.voteValue === 1 ? 1 : -1;
      await prisma.$transaction(async (prisma) => {
        const existingVote = await prisma.vote.findUnique({
          where: {
            userId_songId: {
              userId: songData.userId,
              songId: songData.songId,
            },
          },
        });

        if (existingVote) {
          if (existingVote.value === newValue) {
            await prisma.vote.delete({
              where: {
                id: existingVote.id,
              },
            });

            await prisma.song.update({
              where: { id: songData.songId },
              data: {
                voteCount: {
                  decrement: existingVote.value,
                },
              },
            });
          } else {
            await prisma.vote.update({
              where: { id: existingVote.id },
              data: { value: newValue },
            });

            await prisma.song.update({
              where: { id: songData.songId },
              data: {
                voteCount: {
                  increment: newValue - existingVote.value,
                },
              },
            });
          }
        } else {
          await prisma.vote.create({
            data: {
              userId: songData.userId,
              songId: songData.songId,
              value: newValue,
            },
          });

          await prisma.song.update({
            where: { id: songData.songId },
            data: {
              voteCount: {
                increment: newValue,
              },
            },
          });
        }
      });

      // Refresh the room data
      const roomData = await prisma.room.findUnique({
        where: {
          code: songData.roomCode,
        },
        include: {
          songs: {
            orderBy: {
              voteCount: 'desc',
            },
          },
          currentSong: true,
        },
      });

      io.in(roomData.id).emit("roomData", roomData);
    } catch (error) {
      console.error("Error voting song:", error);
      socket.emit("error", { message: "Could not vote for the song." });
    }
  };

  // Socket event listeners
  socket.on("createRoom", createRoom);
  socket.on("joinRoom", joinRoom);
  socket.on("addSong", addSong);
  socket.on("voteSong", voteSong);
};

export default roomHandler;
