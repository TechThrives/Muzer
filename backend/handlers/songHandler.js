import prisma from "../config/prismaConfig.js";

const songHandler = (io, socket) => {
  const updateSong = async (songData) => {
    try {
      const updatedSong = await prisma.song.update({
        where: {
          id: songData.songId,
        },
        data: {
          isPlaying: songData.isPlaying,
          timeProgress: songData.timeProgress,
        },
      });

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
          currentSong: true,
        },
      });

      socket.to(roomData.id).emit("roomData", roomData);
    } catch (error) {
      console.error(error);
      socket.emit("error", { message: "Could not update song." });
    }
  };

  const nextSong = async ({ roomCode }) => {
    try {
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

      if (!roomData) {
        socket.emit("error", { message: "Room does not exist." });
        return;
      }

      // Remove current song of room data
      if (roomData.currentSong) {
        await prisma.song.delete({
          where: {
            id: roomData.currentSong.id,
          },
        });
      }

      if (roomData.songs.length === 0) {
        const updatedRoomData = await prisma.room.findUnique({
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
        io.to(roomData.id).emit("roomData", updatedRoomData);
        io.to(roomData.id).emit("error", { message: "No songs in room." });
        return;
      }

      const nextSong = roomData.songs[0];

      // Set current song to next song and disconnect previous song from room
      await prisma.room.update({
        where: {
          id: roomData.id,
        },
        data: {
          currentSongId: nextSong.id,
          songs: {
            disconnect: {
              id: nextSong.id,
            },
          },
        },
      });

      const updatedRoomData = await prisma.room.findUnique({
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

      io.to(roomData.id).emit("roomData", updatedRoomData);

    } catch (error) {
      console.error(error);
      socket.emit("error", { message: "Could not update song." });
    }
  };

  socket.on("updateSong", updateSong);
  socket.on("nextSong", nextSong);
};

export default songHandler;
