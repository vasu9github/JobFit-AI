import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import cors from 'cors'

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({ origin:`${process.env.FRONTEND_URL}`}))
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

app.listen(PORT, () => console.log(`Server is live at port: ${PORT}`));

