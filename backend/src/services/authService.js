import auth from "../models/auth.js"
import generateAccessToken from '../utils/generateAccessToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'
import bcryptjs from 'bcryptjs'


export const login = async(email,password)=>{
    try{
        const admin = await auth.findOne({email})
        const comparePassword = await bcryptjs.compare(password,admin.password)
        if(!comparePassword) throw new Error('Password is incorrect')
    
        const accessToken = await generateAccessToken('admin._id')
        const refreshToken = await generateRefreshToken('admin._id')

        if (!accessToken || !refreshToken) throw new Error('Token not available')
    
        const updateUser = await auth.findByIdAndUpdate(auth?._id,{
            last_login_date: new Date()
        })

        const adminUser = await auth.findById(admin._id)

        return {
            user: adminUser,
            accessToken: accessToken,
            refreshToken: refreshToken
            };
    }catch(error){
        return{
            success:false,
            message:error.message
        }
    }


}

