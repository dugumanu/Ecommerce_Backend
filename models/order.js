const { default: mongoose, model } = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  
  deliveryAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  
  price: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], required: true },
  paymentStatus: { type: mongoose.Schema.Types.ObjectId, ref : "Payment" }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
