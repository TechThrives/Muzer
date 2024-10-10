import express from "express";
import prisma from "../config/prismaConfig.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  // generate random string of length 6
  const code = Math.random().toString(36).slice(-6);
  try {
    let room = await prisma.room.findUnique({
      where: {
        code: code,
      },
    });

    if (!room) {
      room = await prisma.room.create({
        data: {
          hostId: req.user.id,
          code: code,
        },
      });
    }
    return res.json(room);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const hostedRooms = await prisma.room.findMany(
      {
        where: {
          hostId: req.user.id,
        },
        include: {
          favoritedBy: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }
    );

    const favoriteRooms = await prisma.room.findMany({
      where: {
        favoritedBy: {
          some: {
            id: req.user.id,
          },
        },
      },
      include: {
        currentSong: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });


    return res.json({hostedRooms, favoriteRooms});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:roomCode/isHost", async (req, res) => {
  const { roomCode } = req.params;

  try {
    const userId = req.user.id;

    const room = await prisma.room.findUnique({
      where: {
        code: roomCode,
        hostId: userId,
      },
    });

    if (!room) {
      return res.json({ isHost: false });
    }

    return res.json({ isHost: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:roomCode", async (req, res) => {
  const { roomCode } = req.params;
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
        favoritedBy: true,
      },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const isFavorite = room.favoritedBy.some((favUser) => favUser.id === req.user.id);

    return res.json({ ...room, isFavorite });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/:roomCode/favorite", async (req, res) => {
  
  const { roomCode } = req.params;
  try {
    const room = await prisma.room.findUnique({
      where: {
        code: roomCode,
      },
    });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        favoriteRooms: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favoriteRooms.some((favRoom) => favRoom.id === room.id)) {
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          favoriteRooms: {
            disconnect: {
              id: room.id,
            },
          },
        },
      });
      return res.status(200).json({ message: "Removed from favorites" });
    }

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        favoriteRooms: {
          connect: {
            id: room.id,
          },
        },
      },
    });
    return res.status(200).json({ message: "Added to favorites" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
