const express=require('express');
const { addBooking, getOnesBooking, ownedProperty, allBookings, updateBookingStatus, updateBooking, updateBookingStatusandremove, ownerPropertyBooking } = require('../Controllers/bookingController');
const router=express.Router();
router.post('/add',addBooking);
router.get('/get-onesbooking/:id',getOnesBooking);
router.get("/owned-property/:id", ownedProperty);

router.get('/allbookings',allBookings);
router.get('/ownerpropertybooking/:id',ownerPropertyBooking);

router.put('/update-status',updateBookingStatus);
router.post('/remove-userbooking',updateBookingStatusandremove);

router.put('/update-booking/:bookingId', updateBooking);



module.exports=router;