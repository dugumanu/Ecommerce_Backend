const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
    quantity: { type: Number, required: true },
    address: { type: String, required: true }, 
    price: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'shipped', 'delivered'], required: true },
    paymentStatus: { type: String, enum: ['unpaid', 'paid'], required: true }
  });
  
  const Order = mongoose.model('Order', orderSchema);
  