import jwt from 'jsonwebtoken'
import 'dotenv/config'
import Auth from '../models/auth.js'

const generateRefreshToken = async(userId)=>{
    const token =  await jwt.sign({id:userId},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
    const updateToken = await Auth.findByIdAndUpdate({_id:userId},{
        refresh_token:token
    })
    return token
}

export default generateRefreshToken