import auth from "../models/auth.js"
import generateAccessToken from '../utils/generateAccessToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'
import bcryptjs from 'bcryptjs'

export const createAdmin = async(username,email,password)=>{
    try{
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const admin = await auth.create({
            username,
            email,
            password:hashedPassword
        })

        const savedAdmin = await admin.save()

        return {
            success:true,
            message:'admin created successfully',
        }
    }catch(error){
        return {
            success:false,
            message:error.message
        }
    }
}
export const login = async(email,password)=>{
    try{
        const admin = await auth.findOne({email})
        if(!admin) throw new Error('Admin not found')
        const comparePassword = await bcryptjs.compare(password,admin.password)
        if(!comparePassword) throw new Error('Password is incorrect')
    
        const accessToken = await generateAccessToken(admin._id)
        const refreshToken = await generateRefreshToken(admin._id)

        if (!accessToken || !refreshToken) throw new Error('Token not available')
    

        const adminUser = await auth.findById(admin._id)

        return {
            success:true,
            user: adminUser,
            accessToken,
            refreshToken
            };
    }catch(error){
        return{
            success:false,
            message:error.message || "Unknown system error"
        }
    }


}

