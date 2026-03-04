import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    lastname: { type: String, required: true, trim: true },

    user_name: { 
      type: String, 
      required: true, 
      unique: true,   
      trim: true 
    },

    email: { 
      type: String, 
      required: true, 
      unique: true,   
      lowercase: true 
    },

    phone: { 
      type: String, 
      required: true 
    },

    profile_image: { 
      type: String, 
      default: ""     
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",   
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);