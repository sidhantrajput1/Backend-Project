import express from "express";
import adminAuth from '../middlewares/adminAuth.js';
import authUser from "../middlewares/auth.js";

import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  updateStatus,
  userOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Admin Routes
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Routes
orderRouter.post('/place', authUser, placeOrder); 
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User Routes
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;
