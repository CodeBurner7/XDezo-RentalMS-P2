const mongoose=require('mongoose');
const favouriteSchema=new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'users',
          required: true 
        },
    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"property",
        required:true
    }
}, { timestamps: true });
module.exports=mongoose.model("favourite",favouriteSchema);