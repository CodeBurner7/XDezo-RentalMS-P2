const express = require("express");
const { loginController, registerController, updateProfileController, getAllUsersController, getUserByIdController, deleteUserByIdController } = require("../Controllers/userController");
const router = express.Router();

//routes
router.post("/login", loginController);

router.post("/register", registerController);

router.put("/update-profile", updateProfileController);

router.get("/get-allusers", getAllUsersController);
router.get("/get-userbyid/:id", getUserByIdController);
router.delete("/delete-userbyid/:id", deleteUserByIdController);




module.exports=router;