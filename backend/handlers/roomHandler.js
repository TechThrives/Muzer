import prisma from "../config/prismaConfig.js";
import bcrypt from "bcrypt";

const roomHandler = (io, socket) => {
  const createRoom = async () => {
    //create temp user
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
    let room = await prisma.room.findUnique(
      {
        where: {
          code: "abc",
        },
      }
    );

    if (!room) {
      
     room = await prisma.room.create({
      data: {
        hostId: user.id,
        code: "abc"
      },
    });
    }

    socket.emit("roomCreated", room);
  };

  const joinRoom = async ({roomCode}) => {
    const room = await prisma.room.findUnique({
      where: {
        code: roomCode
      },
      include: {
        songs: true
      }
    })

    if (!room) {
      socket.emit("error", { message: "Room does not exist" });
      return;
    }

    socket.join(room.id);
    console.log("Joined room", room.id);
    socket.emit("roomData", room);
  }

  const getRoom = async ({roomCode}) => {
    const room = await prisma.room.findUnique({
      where: {
        code: roomCode
      },
      include: {
        songs: true
      }
    })

    if (!room) {
      socket.emit("error", { message: "Room does not exist" });
      return;
    }

    socket.join(room.id);
    socket.emit("roomData", room);
  }

  const addSong = async ({roomCode, newSong}) => {

    const room = await prisma.room.findUnique({
      where: {
        code: roomCode
      }
    });

    if (!room) {
      socket.emit("error", { message: "Room does not exist" });
      return;
    }

    const songCount = await prisma.song.count({
      where: {
        rooms: {
          some: {
            id: room.id
          }
        },
        addedById: newSong.addedById
      }
    });

    // Check if the user has already added 2 songs
  if (songCount >= 2) {
    socket.emit("error", { message: "You have already added 2 songs" });
    return;
  }

    // Add a song to the room
    const song = await prisma.song.create({
      data: {
        url: newSong.url,
        title:"test",
        artist:"test",
        rooms: {
          connect: {
            id: room.id,
          },
        },
        addedById: newSong.addedById,
      },
    });

    const roomData = await prisma.room.findUnique({
      where: {
        code: roomCode
      },
      include: {
        songs: true
      }
    })

    io.in(room.id).emit("roomData", roomData);

    socket.emit("success", { message: "Song added successfully" });
  };

  // Upvote or Downvote a song
  async function voteSong(userId, songId, newValue) {
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_songId: {
          userId,
          songId,
        },
      },
    });

    // If the user has already voted
    if (existingVote) {
      if (existingVote.value === newValue) {
        // If they try to vote the same value, remove their vote
        await prisma.vote.delete({
          where: {
            id: existingVote.id,
          },
        });

        // Adjust vote count on the song
        await prisma.song.update({
          where: { id: songId },
          data: {
            voteCount: {
              decrement: existingVote.value, // Remove the previous vote's impact
            },
          },
        });
      } else {
        // Update the vote with the new value
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { value: newValue },
        });

        // Update the song's vote count accordingly
        await prisma.song.update({
          where: { id: songId },
          data: {
            voteCount: {
              increment: newValue - existingVote.value, // Adjust the vote count
            },
          },
        });
      }
    } else {
      // Create a new vote
      await prisma.vote.create({
        data: {
          userId,
          songId,
          value: newValue,
        },
      });

      // Adjust the song's vote count
      await prisma.song.update({
        where: { id: songId },
        data: {
          voteCount: {
            increment: newValue, // Add the new vote's impact
          },
        },
      });
    }
  }

  socket.on("createRoom", createRoom);
  socket.on("joinRoom", joinRoom);
  socket.on("getRoom", getRoom);
  socket.on("addSong", addSong);
};

export default roomHandler;
