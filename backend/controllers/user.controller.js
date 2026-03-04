import { User } from "../models/userSchema.js";


export const addUser = async (req, res) => {
    try {
        const data = req.body;

        if (req.file) {
            data.profile_image = req.file.filename; 
        }

        const user = await User.create(data);

        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error creating user" });
    }
};


export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch {
        return res.status(500).json({ message: "Error fetching users" });
    }
};


export const updateUser = async (req, res) => {
    try {
        const data = req.body;

        if (req.file) {
            data.profile_image = req.file.filename;
        }

        const updated = await User.findByIdAndUpdate(
            req.params.id,
            data,
            { new: true }
        );

        return res.status(200).json(updated);
    } catch (err) {
        return res.status(500).json({ message: "Error updating user" });
    }
};