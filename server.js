const express = require('express');
const fileUploadRoute = require('./routes/fileUpload-route');
const userRoute = require('./routes/userRoute')
const dotenv = require('dotenv');
const connectDB = require('./config/db')

dotenv.config({path: './config.env'})

const app = express()

connectDB();

app.use(express.json({extended: false}))

// mount route
app.use('/api/v1/uploads', fileUploadRoute)
app.use('/api/v1/users', userRoute)



const port  = process.env.PORT || 6000

app.listen(port,  ()=>{
    console.log(`server started on port ${port}`);
    
})
