import leads from '../models/leads.js'


export const newLeads = async(name,email,phone)=>{
    try{
        const newLeads = await leads.create({
            name,email,phone
        })

        const save = await newLeads.save()

        return {
            success:true,
            message:'add new leads successfully',
        }

    }catch(error){
        return {
            success:false,
            message:error.message
        }
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

