import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

const roomHandler = (io, socket) => {
  const joinRoom = async ({ roomCode }) => {
    try {
      const room = await prisma.room.findUnique({
        where: {
          code: roomCode,
        },
        include: {
          songs: {
            orderBy: {
              voteCount: "desc",
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

  const addSong = async ({ roomCode, songData }) => {
    try {
      const room = await prisma.room.findUnique({
        where: {
          code: roomCode,
        },
        include: {
          songs: {
            orderBy: {
              voteCount: "desc",
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
          addedById: songData.addedById,
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
          src: songData.src,
          title: songData.title,
          artist: songData.artist,
          thumbnail: songData.thumbnail,
          label: songData.label,
          language: songData.language,
          duration: songData.duration,
          year: parseInt(songData.year),
          addedById: songData.addedById,
        },
      });

      // Connect the new song to the room
      if (room.currentSong != null) {
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

        // Fetch updated room data after the song addition
        const roomData = await prisma.room.findUnique({
          where: {
            code: roomCode,
          },
          include: {
            songs: {
              orderBy: {
                voteCount: "desc",
              },
            },
          },
        });

        io.in(room.id).emit("songData", roomData.songs);
      } else {
        // Set the current song of the room if there is no current song
        await prisma.room.update({
          where: {
            id: room.id,
          },
          data: {
            currentSongId: song.id,
          },
        });

        // Fetch updated room data after the song addition
        const roomData = await prisma.room.findUnique({
          where: {
            code: roomCode,
          },
          include: {
            songs: {
              orderBy: {
                voteCount: "desc",
              },
            },
            currentSong: true,
          },
        });

        io.in(room.id).emit("roomData", roomData);
      }

      // Emit success message
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
              voteCount: "desc",
            },
          },
        },
      });

      io.in(roomData.id).emit("songData", roomData.songs);
    } catch (error) {
      console.error("Error voting song:", error);
      socket.emit("error", { message: "Could not vote for the song." });
    }
  };

  // Socket event listeners
  socket.on("joinRoom", joinRoom);
  socket.on("addSong", addSong);
  socket.on("voteSong", voteSong);
};

export default roomHandler;
