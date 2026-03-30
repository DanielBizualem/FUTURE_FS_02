
import { login } from "../services/authService.js";

const loginController = async(req,res)=>{
    try{
        const {email,password} = req.body
        if (!email || !password) {
            return res.json({
              success: false,
              message: "Provide email and password",
            });
          }
        
          const result = await login(email,password)

          const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
          };
      
          res.cookie("accessToken", result.accessToken, cookieOptions);
          res.cookie("refreshToken", result.refreshToken, cookieOptions);
      
          return res.status(200).json({
            success: true,
            message: "Login successfully",
            user: result.user,
            data: {
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
            },
          })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}

export {loginController}