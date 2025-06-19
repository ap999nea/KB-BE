import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await registerUser(email, password);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
