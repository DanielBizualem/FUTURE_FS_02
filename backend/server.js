import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import mongoose from 'mongoose';
import { connectDB } from './src/config/db.js';


dotenv.config();
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})