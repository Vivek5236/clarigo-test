import express from "express";
import { addUser, getUsers, updateUser } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/add", protect,upload.single("image"), addUser);
userRouter.get("/view", protect, getUsers);
userRouter.put("/update/:id", protect,upload.single("image"), updateUser);


export default userRouter;
