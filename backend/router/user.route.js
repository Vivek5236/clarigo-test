import express from "express";
import { addUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/add", protect, addUser);
userRouter.get("/view", protect, getUsers);
userRouter.put("/update/:id", protect, updateUser);


export default userRouter;
