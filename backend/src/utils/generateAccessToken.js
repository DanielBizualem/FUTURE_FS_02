import jwt from 'jsonwebtoken'

const generateAccessToken = async(userId)=>{
    const token = await jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'5h'})
    return token
}

export default generateAccessToken