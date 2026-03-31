import { createAdminController, loginController } from "../Controllers/loginController.js"
import express from "express"

const adminRouter = express.Router()

adminRouter.post('/login',loginController)
adminRouter.post('/register',createAdminController)

export default adminRouter