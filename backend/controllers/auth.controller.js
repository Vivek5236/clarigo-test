import { Auth } from "../models/authSchema.js";
import jwt from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcrypt";
import ApiResponse from "../utils/apiResponse.js";

export const loginUser = async (req, res) => {
    try {


        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }

        const { email, password } = req.body;

        const user = await Auth.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (err) {
        console.log("LOGIN ERROR:", err);
        return res.status(500).json({
            message: "Server Error",
        });
    }
};


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existingUser = await Auth.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Auth.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};
