const mongoose = require('mongoose');
const Website = require("./Website")
const Order = require("./Order")

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    websiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
    createdAt:{type:Date,default:Date.now()},
    sizeType:{type:String,enum:["hip","shoulder",null],default:null},
    size:{type:Number,default:null},
    imageUrl: {
        type: String, // Store the path to the image
        required: false
      }
});
productSchema.post('findByIdAndRemove', async function(doc) {
  if(doc){

    try {
      await Order.deleteMany({ products: {$in:[doc._id]} });
      await Website.updateMany({products:{$in:[doc._id]}},{$pull:{$products:doc._id}})
    } catch (error) {
      console.log(error);
    }
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
