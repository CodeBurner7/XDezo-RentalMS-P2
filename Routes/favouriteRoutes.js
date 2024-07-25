const express=require("express");
const { addtoFavourite, removeFavorite, getFavorites, checkFavourite } = require("../Controllers/favouriteController");
const router=express.Router();
router.post('/add', addtoFavourite);
router.delete('/remove', removeFavorite);
router.get('/getfavourites/:userId', getFavorites);
router.post('/checkfavourite', checkFavourite);

module.exports = router;