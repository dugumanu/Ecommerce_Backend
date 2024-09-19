const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
    name: { type: String, required: true },
    originalPrice : {type : Number},
    discount : {type : Number},
    price : {type : Number},
    about: { type: String },
    ratingAndReviewIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RatingAndReview' }], 
    image: [{ type: String }], 
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } ,
    state:{type:String},
    city:{type: String}
  });
  
  const Product = mongoose.model('Product', productSchema);
  module.exports = Product;
  