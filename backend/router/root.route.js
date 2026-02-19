import { Router } from "express";
import userRouter from "./user.route.js";
import authRouter from "./auth.route.js";

const rootRouter = Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/auth", authRouter);

export default rootRouter;
