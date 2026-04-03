import leads from '../models/leads.js'


export const createLeadService = async (fullname, email, phone, source) => {
    try {
        // .create() handles both 'new' and '.save()' in one go
        const result = await leads.create({
            fullname,
            email,
            phone,
            source: source || "Website" // Fallback if source is missing
        });

        return {
            success: true,
            message: 'Lead added successfully',
            data: result // Returning the data is helpful for the frontend
        };

    } catch (error) {
        console.error("Service Error:", error);
        return {
            success: false,
            message: error.message
        };
    }
}

export const leadsDetail = async()=>{
    try{
        const leadsDetail = await leads.find()
        return {
            success:true,
            message:"Leads Detail fetched successfully",
            data:leadsDetail
        }
    }catch(error){
        return {
            success:false,
            message:error.message
        }
    }

}

export const removeLeads = async(id)=>{
    try{
        
        const deletedLead = await leads.deleteMany({
            _id: { $in: Array.isArray(ids) ? ids : [ids] }
        })
        if (!deletedLead) {
            return {
                success: false,
                message: "Lead not found"
            };
        }
        return {
            success: true,
            message: `${deletedLead.deletedCount} lead(s) removed successfully`,
            deletedCount: result.deletedCount
        };
    }catch(error){
        throw error
    }
}

