import  Mongoose  from "mongoose";

const userSchema = new Mongoose.Schema({
    name:{
        type:String,
        reauired: true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
const User = Mongoose.model("userDB", userSchema)
export default User