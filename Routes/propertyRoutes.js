const express=require("express");
const { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty, getFeaturedProperties, ownedProperty, getImageProperty } = require("../Controllers/propertyController");
const router = express.Router();
// router.post("/add-property", createProperty);

const formidable =require( "express-formidable");

router.post('/create-property',formidable(),createProperty);

router.get("/getall-property", getProperties);
router.get("/getsingle-property/:id", getPropertyById);
router.put("/update-property/:id", formidable(), updateProperty);
router.delete("/delete-property/:id", deleteProperty);
router.get("/getfeatured-property", getFeaturedProperties);


router.get("/owned-property/:id", ownedProperty);

//for property to get images
router.get("/getimagebyid/:id", getImageProperty);







module.exports=router;