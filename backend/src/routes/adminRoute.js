import { addsNewLeads, leadsList, removeLead } from "../Controllers/leadsController.js"
import { createAdminController, loginController } from "../Controllers/loginController.js"
import express from "express"
import  auth  from "../middlewares/auth.js"


const adminRouter = express.Router()

adminRouter.post('/login',loginController)
adminRouter.post('/register',createAdminController)
adminRouter.post('/addLeads',auth,addsNewLeads)
adminRouter.get('/leadsDetail',auth,leadsList)
adminRouter.post('/removeLead',auth,removeLead)

export default adminRouter