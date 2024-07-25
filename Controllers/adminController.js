
const bookingModel = require('../Models/bookingModel');
const propertyModel = require('../Models/propertyModel');
const userModel = require('../Models/userModel');


exports.metricsController = async (req, res) => {
  try {
    const totalBookings = await bookingModel.countDocuments();
    const totalProperties = await propertyModel.countDocuments();
    const activeUsers = await userModel.countDocuments({ active: true });

    res.status(200).json({
      totalBookings,
      totalProperties,
      activeUsers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
