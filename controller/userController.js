const User = require('../models/UserModel')


exports.getAllUsers = async (req,res)=>{
    try {
        const users = await User.find();

        res.status(200).json({
            status: 'success',
            results: users.length,
            usersData: {
                users
            }
        })
        
    } catch (err) {
        res.status(500).json({
            status: 'error',
            msg: err.message
          });
    }
}


exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json({
        status: 'success',
        usersData: {
            user
        }
    });
    } catch (err) {
      res.status(500).json({
        status: "failed",
        message: err.message
      });
    }
  };


  exports.deleteUser = async(req, res)=>{
      try {

        const user = await User.findByIdAndDelete(req.params.id)
          res.status(204).json({
            status: "success",
            data: null
          });
      } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
          });
      }
  }


  exports.createUser = async (req, res)=>{
      try {
          const newUser = await User.create({
              name: req.body.name,
              profession: req.body.profession,
              password:req.body.password
          });
          res.status(201).json({
              status: 'success',
              userData:{
                  user: newUser
              }
          })
          
      } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
          });
      }
  }


  exports.updateUser = async(req,res)=>{
      try {
          
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        })

        res.status(201).json({
            status: 'success :  User Updated',

              userData:{
                  user: updatedUser
              }
        })

      } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
          });
      }
  }