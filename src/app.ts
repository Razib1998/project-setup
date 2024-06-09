import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";

const app: Application = express();

// Parsers

app.use(express.json());
app.use(cors());

// Application Routes..

app.use("/api/v1/students", StudentRoutes);

const getController = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/", getController);

export default app;
