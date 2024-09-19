const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image : {type : String},
    banner : {type: String},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] 
  });
  
  const Category = mongoose.model("Category", categorySchema);
  module.exports = Category;
  