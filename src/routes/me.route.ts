import { Router } from "express";
import {
  AuthenticatedRequest,
  authMiddleware,
} from "../middleware/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, (req: AuthenticatedRequest, res) => {
  res.status(200).json({
    message: "Knowledge base backend is alive 🚀 and you're Authenticated!",
    user: req.user,
  });
});

export default router;
