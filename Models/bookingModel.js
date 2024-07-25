const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'property', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'pending' } // like.., pending, confirmed, cancelled
   
}, { timestamps: true }
);

module.exports = mongoose.model('booking', bookingSchema);

