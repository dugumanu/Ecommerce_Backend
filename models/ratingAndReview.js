const ratingAndReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
    rating: { type: Number, required: true },
    review: { type: String, required: true }
  });
  
  const RatingAndReview = mongoose.model('RatingAndReview', ratingAndReviewSchema);
  