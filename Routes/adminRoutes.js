const express=require('express');
const { metricsController} = require('../Controllers/adminController');

const router=express.Router();
router.get('/metrics',metricsController);
module.exports=router;