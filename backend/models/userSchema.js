import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    profile_image: { type: String, required: false },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
