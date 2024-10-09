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

export default router;
