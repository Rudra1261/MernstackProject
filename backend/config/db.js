import  Mongoose  from "mongoose";
import config from 'config'
const db = config.get('mongoURI')

 const connectDB = async () => {
    try {
        await Mongoose.connect(db, {
            useNewURLParser: true,
        })
        console.log('database connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export default connectDB