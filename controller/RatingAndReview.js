const mongoose = require("mongoose");
const Product = require("../models/product");
const RatingAndReview = require("../models/ratingAndReview");


exports.createRatingAndReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { review, rating } = req.body;
        const userId = req.user.id;

        
        const boughtByUser = await Product.findOne({
            _id: productId,
            buyer: { $elemMatch: { $eq: userId } }
        });

        if (!boughtByUser) {
            return res.status(400).json({
                message: "User hasn't purchased this item.",
                success: false
            });
        }

        
        const alreadyReviewed = await RatingAndReview.findOne({
            productId: productId,
            userId: userId
        });

        if (alreadyReviewed) {
            return res.status(400).json({
                message: 'User has already reviewed this product.',
                success: false
            });
        }


        const newRatingAndReview = new RatingAndReview({
            rating,
            review,
            userId,
            productId
        });

        await newRatingAndReview.save();
        return res.status(200).json({
            message: "Rating and review created successfully.",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create rating and review.",
            success: false,
            error: error.message
        });
    }
};


exports.getAvgRating = async (req, res) => {
    try {
        const { productId } = req.params;
        const averageRating = await RatingAndReview.aggregate([
            {
                $match: { productId: mongoose.Types.ObjectId(productId) }
            },
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: "$rating" }
                }
            }
        ]);

        if (averageRating.length > 0) {
            return res.status(200).json({
                avgRating: averageRating[0].avgRating,
                success: true
            });
        } else {
            return res.status(404).json({
                message: "No ratings found for this product.",
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch average rating.",
            success: false,
            error: error.message
        });
    }
};


exports.getAllRatingsAndReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    


    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    
    const ratingsAndReviews = await RatingAndReview.find({ productId }).populate('userId');

    return res.status(200).json({
      message: "Ratings and reviews retrieved successfully",
      success: true,
      data: ratingsAndReviews
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while retrieving ratings and reviews",
      success: false,
      error: error.message,
    });
  }
};
