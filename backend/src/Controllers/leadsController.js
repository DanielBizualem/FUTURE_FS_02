import { leadsDetail, createLeadService } from "../services/leadsService.js"


const addsNewLeads = async (req, res) => {
    try {
        // NOTE: Destructure 'name' because that is what your frontend 'state' uses
        const { fullname, email, phone, source } = req.body;

        // 1. Check for missing fields (Use res.status instead of return object)
        if (!fullname || !email || !phone) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Provide name, email, and phone correctly"
            });
        }

        // 2. Call your logic function
        // Pass 'name' as the 'fullname' argument
        const result = await createLeadService(fullname, email, phone, source || "Website");

        // 3. Send Success Response
        return res.status(200).json({
            message: "Lead created successfully",
            success: true,
            error: false,
            data: result
        });

    } catch (error) {
        // 4. Handle Errors (Crucial so frontend doesn't hang on crash)
        console.error("Controller Error:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal Server Error"
        });
    }
};
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