import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import mongoose from 'mongoose';
import { connectDB } from './src/config/db.js';
import adminRouter from './src/routes/adminRoute.js';
import cookieParser from 'cookie-parser'


dotenv.config();
const app = express()
app.use(cookieParser())
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://clientleadmanagement.vercel.app"
  ], // Explicitly allow your frontend URL
    credentials: true                // Allow cookies/headers to be sent
}))

app.use(express.json())
app.use('/admin',adminRouter)

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})