import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import "express-async-errors";
import cors from "cors"
import { json } from "body-parser";
import { ticketRouter } from "./routes/index";
import { errorHandler, NotFoundError, current_user } from "@onojanpmorg/common";

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== "test"
}));
app.use(current_user)
app.use(cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE, PATCH",
  credentials: true
}));
ticketRouter(app);
app.get("/status", (req: Request, res: Response) => {
  res.send({ status: "OK!" });
})
app.all("*", async () => {
  throw new NotFoundError();
})
app.use(errorHandler);

export { app }