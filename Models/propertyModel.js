const mongoose=require('mongoose');
const propertySchema = new mongoose.Schema({
    owner: { 
        type: mongoose.Schema.Types.ObjectId,
        // type: mongoose.ObjectId,
         ref: 'users',
          required: true 
        },
    // owner: [
    //     {
    //       type: mongoose.ObjectId,
    //       ref: "users",
    //     },
    //   ],
    address: {
         type: String,
         required: true 
        },
    description: String,
    rent_amount: {
         type: Number,
          required: true
        },
    status: {
         type: String,
          default: 'available',
           enum: ['available', 'rented'] 
        },
    category: {
            type: String,
            required: true,
            enum: ['apartment', 'room', 'condo']  // Enumerated type  category ko lagi
          },
    // images: [String],
    images: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);
  
module.exports=mongoose.model("property",propertySchema);
  