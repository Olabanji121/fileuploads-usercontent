const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please input a name ']
    },
    password: {
        type: String,
        required: [true, 'Please provide  a password '],
        minlength: 8
        
      },
      profession:{
        type: String,
        required: [true, 'Please input your Profession '],
      }
})


const User = mongoose.model('User', UserSchema)

module.exports = User