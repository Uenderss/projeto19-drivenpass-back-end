import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "@/config";

loadEnv();

import { handleApplicationErrors } from "@/middlewares";
import {
  usersRouter,
  authenticationRouter,
  credentialRouter,
  netWorkRouter
} from "@/routers";

const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/auth", authenticationRouter)
  .use("/users", usersRouter)
  .use("/credentials", credentialRouter)
  .use("/network", netWorkRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
