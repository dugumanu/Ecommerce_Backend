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
            const product = await Product.findById(productData._id);
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

            console.log("Product ====== ", product)
            const newPayment = new Payment({
                productId: product._id,
                paymentMode: paymentMethod,
                paymentStatus: "Not Paid",
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
                sellerId: product.sellerId
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


exports.myOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch orders and populate productId, paymentStatus, and categoryId
        const order = await Order.find({ userId: userId })
            .populate({
                path: "productId",
                populate: { path: "categoryId", select: "name" }, // Populate categoryId inside productId
            })
            .populate("paymentStatus") // Populate paymentStatus
            .sort({ createdAt: -1 });

        

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            order,
        });
    } catch (error) {
        console.error("Error in fetching order:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch the order. Please try again later.",
            error: error.message,
        });
    }
};


exports.sellerOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const order = await Order.find({ sellerId: userId })
            .populate({
                path: "productId",
                populate: { path: "categoryId", select: "name" }, // Populate categoryId inside productId
            })
            .populate("paymentStatus") 
            .sort({ createdAt: -1 });

        

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            order,
        });
    } catch (error) {
        console.error("Error in fetching order:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch the order. Please try again later.",
            error: error.message,
        });
    }
};


exports.orderStatus =   async (req, res) => {
    const { orderId, paymentId, orderStatus, paymentStatus } = req.body;

    console.log("REQ BODY :", req.body)
  
    
    const validOrderStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
    const validPaymentStatuses = ['Paid', 'Not Paid', 'Pending', 'Failed'];
  
    if (!validOrderStatuses.includes(orderStatus)) {
      return res.status(400).json({ error: 'Invalid order status' });
    }
  
    if (!validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({ error: 'Invalid payment status' });
    }
  
    try {
      
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status: orderStatus },
        { new: true, runValidators: true }
      );
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      
      const payment = await Payment.findByIdAndUpdate(
        paymentId,
        { paymentStatus },
        { new: true, runValidators: true }
      );
  
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
  
      
      res.json({
        order,
        payment,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
