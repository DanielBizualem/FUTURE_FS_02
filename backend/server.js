import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan';



const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})