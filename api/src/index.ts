import express, { Express } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
