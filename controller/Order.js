const Order = require("../models/order");
const Payment = require("../models/payment");
const Product = require("../models/product");

exports.buyOrder = async (req, res) => {
    try {
        const { allId, byCart, deliveryAddress, paymentMethod, productData } = req.body;

        let selectedProducts = [];
        if (byCart) {
            // Fetch products by IDs from the database
            try {
                selectedProducts = await Product.find({ '_id': { $in: allId } });
            } catch (error) {
                console.log( "Error :", error)
            }
            if (selectedProducts.length === 0) {
                return res.status(404).json({ error: "No valid products found for the provided IDs" });
            }
        } else {
            const product = await Product.findById(productData.id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            selectedProducts = [product];
        }

        let generatedTransactionId = paymentMethod === "Cash"
            ? "TRANSCASH" + Date.now()
            : "TRANSACTION" + Date.now(); 

        const userId = req.user.id;
        const orders = []; 
        const payments = [];

        
        for (const product of selectedProducts) {
            const newPayment = new Payment({
                productId: product._id,
                paymentMode: paymentMethod,
                paymentStatus: "notPaid",
                transactionId: generatedTransactionId,
                userId,
                amount: product.price,
                discount: product.discount,
            });

            await newPayment.save();
            payments.push(newPayment);

            const newOrder = new Order({
                userId,
                productId: product._id,
                deliveryAddress, 
                price: product.price, 
                quantity: 1,
                status: "pending", 
                paymentStatus: newPayment._id, 
            });

            await newOrder.save();
            orders.push(newOrder);
        }

        return res.status(201).json({
            success: true,
            message: "Order placed successfully.",
            orders: orders,
            payments: payments,
        });
    } catch (error) {
        console.error("Error in placing order:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to place the order. Please try again later.",
            error: error.message,
        });
    }
};
