import prisma from "../config/prismaConfig.js";

const songHandler = (io, socket) => {
    const updateSong = async (songData) => {
        try {
            const updatedSong = await prisma.song.update({
                where: {
                    id: songData.songId
                },
                data: {
                    isPlaying: songData.isPlaying,
                    timeProgress: songData.timeProgress
                }
            });

            const roomData = await prisma.room.findUnique({
                where: {
                    code: songData.roomCode
                },
                include: {
                    songs: {
                        orderBy: {
                            voteCount: 'desc'
                        }
                    },
                    currentSong: true
                }
            });

            io.to(roomData.id).emit("roomData", roomData);

        } catch (error) {
            console.error(error);
            socket.emit("error", { message: "Could not update song." });
        }
        
    }

    socket.on("updateSong", updateSong);
}

export default songHandler