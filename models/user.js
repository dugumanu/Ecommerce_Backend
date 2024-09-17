const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String }, 
  password: { type: String, required: true }, 
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], 
  profileImage: { type: String },
  address: { type: String },
  role: { type: String, enum: ['customer', 'admin', 'seller'], required: true, default: "customer" }
});

const User = mongoose.model('User', userSchema);
module.exports = User;