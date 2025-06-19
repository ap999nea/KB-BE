import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/client"; // usa Prisma!

const JWT_SECRET = process.env.JWT_SECRET || "secret-dev-key";

export const registerUser = async (
  email: string,
  password: string
): Promise<string> => {
  // controlla se l'utente esiste già
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash della password
  const hashedPassword = await bcrypt.hash(password, 10);

  // crea l'utente nel DB
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // genera il JWT con userId
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  return token;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<string> => {
  // trova l'utente nel DB
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  // verifica la password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // genera il JWT con userId
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  return token;
};
