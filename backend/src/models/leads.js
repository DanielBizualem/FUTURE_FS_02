import mongoose from 'mongoose'

const leadsSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true},
    status:{type:String,default:"New"},
},{timestamps:true})

export default mongoose.model("Lead",leadsSchema)