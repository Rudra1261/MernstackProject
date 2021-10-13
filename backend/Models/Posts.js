import  Mongoose  from "mongoose";
import User from "./User.js";
const schema = Mongoose.Schema;

const postSchema = new schema({
    user:{
        type: schema.Types.ObjectId,
        ref: User
    },
    text:{
        type: String,
        required:true
    },
    name: String,
    avatar: String,
    likes: [
        {
            user:{
                type: schema.Types.ObjectId,
                ref: User
            }
        }
    ],
    comments: [
        {
            user:{
                type: schema.Types.ObjectId,
                ref: User
            },
            text:{
                type: String,
                required:true
            },
            name: String,
            avatar: String,
            date:{
                type :Date,
                default: Date.now()
            }

        }
    ],
    date:{
        type: Date,
        default: Date.now()
    }
})

const Posts = Mongoose.model("post",postSchema)

export default Posts