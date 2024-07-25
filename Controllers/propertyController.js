const propertyModel = require("../Models/propertyModel");
const userModel = require("../Models/userModel");
const upload = require("../client/src/Components/Upload");
const fs=require('fs');


// Create a new property
// exports.createProperty = async (req, res) => {
//     try {
//       const { owner, address, description, rent_amount,status, images,category } = req.body;
  
//           // Log the received owner ID
//     console.log('Received owner ID:', owner);

    
//       // Validate owner exists
//       const ownerExists = await userModel.findById(owner);
//       if (!ownerExists) {
//         return res.status(400).json({ error: 'Owner does not exist' });
//       }
  
//       const property = new propertyModel({
//         owner,
//         address,
//         description,
//         rent_amount,
//         status,
//         images,
//         category
//       });
  
//       await property.save();
//       res.status(201).json(property);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  

//with image working
// exports.createProperty = async (req, res) => {
//   upload.single('image')(req, res, async (err) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     const { owner, address, description, rent_amount, status, category } = req.body;
//     const imagePath = req.file ? req.file.path : null; // Uploaded image path

//     try {
//       // Validate owner exists
//       const ownerExists = await userModel.findById(owner);
//       if (!ownerExists) {
//         return res.status(400).json({ error: 'Owner does not exist' });
//       }

//       const property = new propertyModel({
//         owner,
//         address,
//         description,
//         rent_amount,
//         status,
//         images: imagePath ? [imagePath] : [], // Add image path to images array
//         category
//       });

//       await property.save();
//       res.status(201).json(property);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
// };

//with image working of techinfo ecommerce
exports.createProperty = async (req, res) => {
  // upload.single('image')(req, res, async (err) => {
  //   if (err) {
  //     return res.status(500).json({ error: err.message });
  //   }

  //   const { owner, address, description, rent_amount, status, category } = req.body;
  //   const imagePath = req.file ? req.file.path : null; // Uploaded image path

    try {
          const { owner, address, description, rent_amount, status, category } =req.fields;
          const { images } = req.files;

          //check image size
        //   if(photo && photo.size > 1000000){
        // return res
        //   .status(500)
        //   .send({ error: "photo is Required and should be less then 1mb" });
        //   }

      // Validate owner exists
      // const ownerExists = await userModel.findById(owner);
      // if (!ownerExists) {
      //   return res.status(400).json({ error: 'Owner does not exist' });
      // }

      // const property = new propertyModel({
      //   owner,
      //   address,
      //   description,
      //   rent_amount,
      //   status,
      //   images: imagePath ? [imagePath] : [], // Add image path to images array
      //   category
      // });
            const propertyadd = new propertyModel({...req.fields})

            if (images) {
              propertyadd.images.data = fs.readFileSync(images.path);
              propertyadd.images.contentType = images.type;
            }

            // if (images) {
            //   property.images = Array.isArray(images) ? images.map(image => ({
            //     data: fs.readFileSync(image.path),
            //     contentType: image.type
            //   })) : [{
            //     data: fs.readFileSync(images.path),
            //     contentType: images.type
            //   }];
            // }

      await propertyadd.save();
      res.status(201).json(propertyadd);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  // });
};

 // Update a property by ID
exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, address, rent_amount, status, category } = req.fields;
    const { images } = req.files;

    let property = await propertyModel.findById(id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    property.description = description;
    property.address = address;
    property.rent_amount = rent_amount;
    property.status = status;
    property.category = category;

    if (images) {
      property.images.data = fs.readFileSync(images.path);
      property.images.contentType = images.type;
    }

    await property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//get image by id in replace of image getting in property
exports.getImageProperty=async(req,res)=>{
  try {
    const property = await propertyModel.findById(req.params.id);
    if (!property || !property.images.data) {
        return res.status(404).send('Image not found');
    }
    res.set('Content-Type', property.images.contentType);
    res.send(property.images.data);
} catch (error) {
    res.status(500).send(error.message);
}
}

  // Get all properties
  exports.getProperties = async (req, res) => {
    try {
      const properties = await propertyModel.find().populate('owner', 'name email');
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get a single property by ID
  exports.getPropertyById = async (req, res) => {
    try {
      const property = await propertyModel.findById(req.params.id).populate('owner', 'name email');
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  
  // Delete a property by ID
  exports.deleteProperty = async (req, res) => {
    try {
      const property = await propertyModel.findByIdAndDelete(req.params.id);

  
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
  
      res.status(200).json({
        success:true,
        message: 'Property deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Get one property from each category
exports.getFeaturedProperties = async (req, res) => {
  try {
    const categories = ['room', 'apartment', 'condo'];
    const featuredProperties = await Promise.all(
      categories.map(async (category) => {
        return propertyModel.findOne({ category }).populate('owner', 'name email');
      })
    );
    
    res.status(200).json(featuredProperties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.ownedProperty=async (req,res)=>{
  try {
    const ownedproperty=await propertyModel.find({owner:req.params.id});
    // .populate('property');
    if(!ownedproperty){
      return res.status(404).json({error:"no any owned properties found"})
        }
        res.status(200).json(ownedproperty); 

  } catch (error) {
    res.status(500).json({ error: error.message });

  }
}
