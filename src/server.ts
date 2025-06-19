import express from "express";
import meRouter from "./routes/me.route";
import authRouter from "./routes/auth.route";
import teamRouter from "./routes/team.route";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(meRouter);

app.use(authRouter);

app.use(teamRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
