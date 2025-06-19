import { Router } from "express";
import {
  AuthenticatedRequest,
  authMiddleware,
} from "../middleware/auth.middleware";
import prisma from "../db/client";

const router = Router();

router.post(
  "/teams",
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    const { name } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Utente non autenticato" });
    }

    try {
      const team = await prisma.team.create({
        data: {
          name,
        },
      });

      await prisma.teamMember.create({
        data: {
          userId: userId ?? "",
          teamId: team.id,
          role: "owner",
        },
      });

      res.status(201).json(team);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Errore nella creazione del team" });
    }
  }
);

router.get("/teams", authMiddleware, async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.userId;

  const teams = await prisma.team.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: true,
    },
  });

  res.json(teams);
});

export default router;
