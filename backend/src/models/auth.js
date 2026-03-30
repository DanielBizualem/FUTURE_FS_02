import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    email:{type:String,default:"admin@gmail.com"},
    password:{type:String,default:"admin123"},
    refreshToken:{type:String,default:""}
})

// --- PASSWORD HASHING MIDDLEWARE ---
authSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});


export default mongoose.model('Auth',authSchema)