import {Router} from 'express';
import {loginUser, registerUser} from '../controllers/auth.controller.js';


const authRouter = Router();


authRouter.post("/login", loginUser);
authRouter.post("/signup", registerUser);


export default authRouter;