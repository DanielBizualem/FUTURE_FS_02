import jwt from 'jsonwebtoken'

import 'dotenv/config'
import Auth from '../models/auth.js'
import auth from '../models/auth.js'

const generateRefreshToken = async(userId)=>{
    const token = await jwt.sign(userId,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'5d'})
    const updatedToken = await auth.findByIdAndUpdate({_id:userId},{refreshToken:token})
    return token
}

export default generateRefreshToken