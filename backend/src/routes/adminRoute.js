import { loginController } from "../Controllers/loginController.js"
import express from "express"

const adminRouter = express.Router()

adminRouter.post('/login',loginController)

export default adminRouter