import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import mongoose from 'mongoose';
import { connectDB } from './src/config/db.js';
import adminRouter from './src/routes/adminRoute.js';


dotenv.config();
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use('/admin',adminRouter)

connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})