import { leadsDetail, newLeads } from "../services/leadsService.js"


const addsNewLeads = async(req,res)=>{
    try{
        const {name,email,phone} = req.body

        if(!name||!email||!phone){
            return {
                success:false,
                message:"Provide your name, email and phone correctly"
            }
        }

        const result = await newLeads(name,email,phone)
        return res.status(200).json({
            success:result.success,
            message:result.message
          })
    }catch(error){
        return {
            success:false,
            message:error.message
        }
    }
}
const leadsList = async(req,res)=>{
    try {
        const result = await leadsDetail();
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }
        return res.status(200).json({
            success: true,
            message: result.message,
            data: result.data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}
export {addsNewLeads,leadsList}