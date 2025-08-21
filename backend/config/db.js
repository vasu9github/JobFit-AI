import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected sucessfully.... ${conn.connection.host}`)
    } catch (error) {
        console.log(`MongoDB connection error : ${error.message}`);
        process.exit(1);
    }
}
export default connectDB;