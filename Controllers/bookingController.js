const bookingModel = require("../Models/bookingModel");
const userModel = require("../Models/userModel");

exports.addBooking = async (req, res) => {
  const { userId, propertyId, startDate, endDate, totalPrice, status } = req.body;

  if (!userId || !propertyId || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  try {
      // Check for existing booking by the same user for the same property
      const existingBookingBySameUser = await bookingModel.findOne({ property: propertyId, user: userId });

      if (existingBookingBySameUser) {
          return res.status(400).json({
              success: false,
              message: 'You have already booked the same property, you can update the booking details instead!'
          });
      }

      const booking = new bookingModel({ user: userId, property: propertyId, startDate, endDate, totalPrice, status });
      await booking.save();
      return res.status(201).json({ success: true, booking });
  } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
  }
};


exports.getOnesBooking=async(req,res)=>{
    try {
        const getbookingdata=await bookingModel.find({user:req.params.id}).populate('property');
        if (!getbookingdata) {
            return res.status(404).json({ error: 'No any Bookings found' });
          }
          res.status(200).json(getbookingdata); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//Booking Controller method 1
exports.ownedProperty = async (req, res) => {
    try {
      const userId = req.params.id;
      const bookings = await bookingModel.find()
        .populate({
          path: 'property',
          match: { owner: userId } // Filter properties by owner
        });
  
      // Filter out bookings that do not have a property matching the owner
      const ownedBookings = bookings.filter(booking => booking.property !== null);
  
      const ownedProperties = ownedBookings.map(booking => booking.property);
      res.status(200).json(ownedProperties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


//GET ALL BOOKINGS DATA


exports.allBookings = async (req, res) => {
  try {
    const allbookingsdata = await bookingModel.find()
      .populate({
        path: 'property',
        populate: {
          path: 'owner', // populate the owner field inside property
          model: 'users', // assuming the owner is stored in the User model
        },
      })
      .populate('user');

    res.status(200).json(allbookingsdata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//bookings based on owner
exports.ownerPropertyBooking=async(req,res)=>{
  try {
    const userId = req.params.id;
    const ownerPropertyBookings = await bookingModel.find()
      .populate({
        path: 'property',
        match: { owner: userId }, // Filter properties by owner
      });
      // .populate('user');
      res.status(200).json(ownerPropertyBookings);


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



exports.updateBookingStatus=async (req,res)=>{
  try {
    const {bookingId,status}=req.body;
    const changedstatus=await bookingModel.findById(_id=bookingId).populate('property').populate('user');
    if (!changedstatus) {
      return res.status(404).json({ error: 'booking not found' });
    }
    changedstatus.status = status || changedstatus.status;
    await changedstatus.save();

      res.status(200).json(changedstatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



// Controller to update a booking
exports.updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const updateDetails = req.body;

  try {
    const booking = await bookingModel.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    booking.startDate = updateDetails.startDate;
    booking.endDate = updateDetails.endDate;
    booking.totalPrice=updateDetails.totalPrice;
    await booking.save();

    res.status(200).json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.updateBookingStatusandremove=async (req,res)=>{
  try {
    const {bookingId,status}=req.body;
    const removebooking=await bookingModel.findByIdAndDelete(_id=bookingId);
    if (!removebooking) {
      return res.status(404).json({ error: 'booking not found' });
    }

      res.status(200).json(removebooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}