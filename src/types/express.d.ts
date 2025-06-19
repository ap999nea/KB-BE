export {}; // ⬅️ questo è fondamentale! trasforma il file in un "modulo" TypeScript

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}
