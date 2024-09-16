const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
    name: { type: String, required: true },
    originalprice : {type : number},
    discount : {type : number},
    price : {type : number},
    about: { type: String },
    ratingAndReviewIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RatingAndReview' }], 
    images: [{ type: String }], 
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
  });
  
  const Product = mongoose.model('Product', productSchema);
  module.exports = Product;
  