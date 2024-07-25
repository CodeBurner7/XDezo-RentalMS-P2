const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./Config/db");
const  userRoutes  = require("./Routes/userRoutes");
const adminRoutes=require("./Routes/adminRoutes");
const  propertyRoutes  = require("./Routes/propertyRoutes");
const favouriteRoutes=require("./Routes/favouriteRoutes");
const bookingRoutes=require("./Routes/bookingRoutes");

const cors=require("cors");

//connect to Mongodb
connectDB();

//configure env
dotenv.config();

//rest object
const app = express();



const path = require('path');

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors()); 

// Connect  routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/property", propertyRoutes);
app.use("/api/v1/favourite", favouriteRoutes);
app.use("/api/v1/booking", bookingRoutes);


//rest api
app.get("/", (req, res) => {
  //   res.send({
  //     message: "welcome to rental management app",
  //   });
  res.send("<h1>Welcome to Rental Management System</h1>");
});

const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.bgCyan.white);
});
