
import { login,createAdmin } from "../services/authService.js";

const createAdminController = async(req,res)=>{
  try{
    const {username,email,password} = req.body
    if(!username || !email || !password){
      return res.json({
        success:false,
        message:"Provide username,email and password"
      })
    }
    const result = await createAdmin(username,email,password)
    return res.status(200).json({
      success:result.success,
      message:result.message
    })
  }catch(error){
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
const loginController = async (req, res) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({
              success: false,
              message: "Provide email and password",
          });
      }

      const result = await login(email, password);

      // FIX: Check if the service actually succeeded
      if (!result.success) {
          return res.status(401).json({
              success: false,
              message: result.message // This will be "Password is incorrect" etc.
          });
      }

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
          data: {
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
          },
      });

  } catch (error) {
      return res.status(500).json({
          success: false,
          message: error.message || "Unknown system error"
      });
  }
};

export {loginController,createAdminController}