import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    refreshToken:{type:String,default:""}
})


export default mongoose.model('Auth',authSchema)