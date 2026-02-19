import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("DB connected successfully");
        
    } catch (error) {
        console.log("Error in DB connection", error);
        process.exit(1)  
    }

}


export default connectDB;
