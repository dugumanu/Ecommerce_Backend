const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }],
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    transactionId: { 
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Not Paid", "Pending", "Failed"], 
        default: "pending", 
    },
    paymentMode: {
        type: String,
        enum: ["Cash", "Online", "Net Banking", "UPI", "Card"], 
        default: "Cash",
    },
    amount: { 
        type: Number,
        required: true,
        min: 0, 
    },
    currency: { 
        type: String,
        default: "INR", 
    },
    discount: { 
        type: Number,
        default: 0,
        min: 0, 
    },
    notes: { 
        type: String,
        trim: true,
    },
    failureReason: { 
        type: String,
        default: null,
        trim: true,
    },
    refunded: { 
        type: Boolean,
        default: false,
    },
    refundDetails: { 
        type: {
            refundId: { type: String, default: null }, 
            refundAmount: { type: Number, default: 0 },
            refundDate: { type: Date, default: null },
        },
        default: {}, 
    },
}, { 
    timestamps: true, 
});

module.exports = mongoose.model("Payment", paymentSchema);
