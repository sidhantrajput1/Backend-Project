import { currency } from "../../Admin/src/App.jsx"
import Order from "../models/orderModel.js"
import User from "../models/userModel.js"
import Stripe from 'stripe'

// global variable
const currency = "inr"
const deliveryCharge = 10;

// gateway initialized 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing order using cod method
const placeOrder = async(req, res) => {
    try {
        const { userId,  items, amount, address } = req.body;
        // const userId = req.body.userId;
    
        // if (!userId) {
        //   return res.status(400).json({ success: false, message: "User not authenticated." });
        // }
    
        // if (!items || !Array.isArray(items) || items.length === 0) {
        //   return res.status(400).json({ success: false, message: "Invalid or empty items array." });
        // }
    
        const orderData = {
          userId,
          items,
          amount,
          address,
          paymentMethod : "COD",
          payment : false,
          date: Date.now()
        };
        
        const newOrder = new Order(orderData)
        await newOrder.save();

        await User.findByIdAndUpdate(userId,{cartData : {}})
        
        res.status(201).json({ success: true, message: "Order placed successfully." });
    
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error", error });
      }    
}

// placing order using stripe method
const placeOrderStripe = async (req, res) => {
    try {
        
        const { userId,  items, amount, address } = req.body;
        const {orgin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod : "COD",
            payment : false,
            date: Date.now()
        };

        const newOrder = new Order(orderData)
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data : {
                currency : currency,
                product_data : {
                    name : item.name
                },
                unit_amount : item.price * 100
            },
            quantity : item.quantity
        }))

        line_items.push({
            price_data : {
                currency : currency,
                product_data : {
                    name : "Delivery Charges"
                },
                unit_amount : deliveryCharge * 100
            },
            quantity : 1
        })

        const session = new stripe.checkout.sessions.create({
            success_url :  `${orgin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${orgin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode : 'payment'
        })

        res.status(201).json({
            success : true,
            sesion_url : session.url
        })

    } catch (error) {
        console.log(error)
        res.json({ success : false, message : error.message })
    }
}


// placing order using razorpay method
const placeOrderRazorpay = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        res.json({ success : false, message : error.message })
    }
}


// all order data for admin pannel
const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})

        res.status(201).json({
            success : true,
            orders
        })
        
    } catch (error) {
        console.log(error)
        res.json({ success : false, message : error.message })
    }
}

// user order data for frontend
const userOrders = async (req, res) => {
    try {

        const {userId} = req.body;

        const order = await Order.find({ userId })

        res.status(201).json({
            success : true,
            order
        })

    } catch (error) {
        console.log(error)
        res.json({ success : false, message : error.message })
    }
}

// update order status
const updateStatus = async (req, res) => {
    try {
        
        const {orderId, status} = req.body

        await Order.findByIdAndUpdate(orderId, {status})

        res.status(201).json({
            success : true,
            message : 'Status Updated'
        })

    } catch (error) {
        console.log(error)
        res.json({ success : false, message : error.message })
    }
}


export {updateStatus, userOrders, allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe}