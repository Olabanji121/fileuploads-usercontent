const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config({path: './config.env'})

const db = process.env.MONGOURI

const connectDB = async()=>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })

        console.log("MongoDB connected...");
        
    } catch (err) {
        console.error(err.message);
        //   exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB