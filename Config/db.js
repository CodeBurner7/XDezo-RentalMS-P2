const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/XDezoRMSdb");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/XDezoRMSdb");
    console.log("Connected to MongoDB with Mongoose");
  } catch (error) {
    console.log("Error connecting to mongodb with Mongoose", error);
    process.exit(1);
  }
};
module.exports = connectDB;
