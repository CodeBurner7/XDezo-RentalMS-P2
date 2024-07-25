const userModel=require("../Models/userModel");

const loginController = async (req, res) => {
    try{
    const{email,password}=req.body;

        //validation
        if (!email || !password) {
            return res.status(404).send({
              success: false,
              message: "Enter all fields",
            });
          }

    //check for password of existing email
    const user=await userModel.findOne({email});
    if (!user){
        return res.status(404).send({
            success: false,
            message: "Email is not registerd",
          });
    }
    if (password !== user.password) {
        return res.status(401).send({
            success:false,
            message:"Invalid Password"
        });
      }

    res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role:user.role,
        },
        // token,
      });
}catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
}
};

const registerController = async (req, res) => {
    try {
        const {name,email,password,phone,address,role}=req.body;

        //check for existing user
        const existingUser=await userModel.findOne({email})
        if(existingUser){
         return res.status(400).send({
            success: false,
            message:"User Email Already Existed"  
         })
        }
    
        //creating a new user
        const newUser=new userModel({
            name,email,password,phone,address,role
        })
       await newUser.save();

       //sending response back to client
       res.status(200).send({
        success: true,
        message:"User registered successfully",
        newUser
       });
    } catch (error) {
        console.log("Error Registering user",error);
        res.status(400).send({
            success: false,
            message:"Internal Server Error while registering",
            error
        })
    };
   
};


const updateProfileController = async (req, res) => {
  try {
      const { userId, name, phone, address, email } = req.body;

      // Find the user by ID and update their profile
      const updatedUser = await userModel.findByIdAndUpdate(userId, {
          name,
          phone,
          address,
          email
      }, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getAllUsersController=async (req,res)=>{
    try {
        const usersinfo=await userModel.find()
        if (usersinfo.length > 0) {  // Check if usersinfo array is not empty
            return res.status(200).json({ message: 'Users fetched successfully', user: usersinfo });
          } else {
            return res.status(200).json({ message: 'No users exist', user: [] });
          }

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

const getUserByIdController=async (req,res)=>{
    const {id}=req.params;
    try {
        const userdetails=await userModel.findById(id);
        if (!userdetails) {
            return res.status(404).json({ error: 'User data not found' });
          }
          res.status(200).json(userdetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteUserByIdController=async (req,res)=>{
    const {id}=req.params;
    try {
        const deleteduser=await userModel.findByIdAndDelete(id);
        if (!deleteduser) {
            return res.status(404).json({ error: 'User doesnt exist to delete ' });
          }
          return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { loginController,registerController ,updateProfileController,getAllUsersController,getUserByIdController,deleteUserByIdController};
