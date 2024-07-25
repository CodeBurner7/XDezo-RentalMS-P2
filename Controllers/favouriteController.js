const favouriteModel = require("../Models/favouriteModel");

exports.addtoFavourite = async (req, res) => {
  try {
    const { userId, propertyId } = req.body;

//check for favourite already existed or not
const existingfav=await favouriteModel.findOne({ user: userId, property: propertyId })
if(existingfav){
return exports.removeFavorite(req,res);
}


    const favorite = new favouriteModel({ user: userId, property: propertyId });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { userId, propertyId } = req.body;
    await favouriteModel.findOneAndDelete({ user: userId, property: propertyId });
    res.status(200).json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await favouriteModel.find({ user: userId }).populate('property').populate('user', '-password');
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.checkFavourite = async (req, res) => {
  try {
      const { userId, propertyId } = req.body;
      const existingfav = await favouriteModel.findOne({ user: userId, property: propertyId });
      if (existingfav) {
          res.status(200).send({
              success: true,
              message: "Property is already in your favorite list"
          });
      } else {
          res.status(200).send({
              success: false,
              message: "Property is not in your favorite list"
          });
      }
  } catch (error) {
      res.status(500).send({
          success: false,
          message: "Error checking favorite status",
          error: error.message
      });
  }
};
