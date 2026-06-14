import crypto from "crypto";
import razorpay from "../utils/razorpay.js";
import Booking from "../models/Booking.js";
import { TABLE_CAPACITY } from "../config/tableCapacity.js";
import {
  sendOwnerBookingEmail,
  sendCustomerBookingEmail,
} from "../utils/sendEmail.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};

// VERIFY PAYMENT + CREATE BOOKING
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      bookingData,
    } = req.body;

    // VALIDATION
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment details missing",
      });
    }

    // VERIFY SIGNATURE
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // INVALID SIGNATURE
    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // DUPLICATE PAYMENT CHECK
    const existingBooking = await Booking.findOne({
      $or: [
        {
          paymentId: razorpay_payment_id,
        },
        {
          orderId: razorpay_order_id,
        },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Payment already processed",
      });
    }

    const { name, email, phone, guests, bookingDate, tableType } = bookingData;

    // BOOKING VALIDATION
    if (!name || !email || !phone || !guests || !bookingDate || !tableType) {
      return res.status(400).json({
        success: false,
        message: "All booking fields are required",
      });
    }

    const type = tableType.toUpperCase().trim();

    // CHECK TABLE TYPE
    const totalTables = TABLE_CAPACITY[type];

    if (!totalTables) {
      return res.status(400).json({
        success: false,
        message: "Invalid table type",
      });
    }

    // FINAL AVAILABILITY CHECK
    const bookedCount = await Booking.countDocuments({
      bookingDate,
      tableType: type,

      status: {
        $in: ["pending", "confirmed"],
      },
    });

    const available = totalTables - bookedCount;

    // OVERBOOKING PROTECTION
    if (available <= 0) {
      // AUTO REFUND
      await razorpay.payments.refund(razorpay_payment_id, {
        speed: "normal",
      });

      return res.status(400).json({
        success: false,
        refunded: true,
        message: "Table sold out. Payment refunded automatically.",
      });
    }

    // CREATE BOOKING
    const booking = await Booking.create({
      name,
      email,
      phone,
      guests,

      bookingDate,

      tableType: type,

      paymentId: razorpay_payment_id,

      orderId: razorpay_order_id,

      status: "confirmed",
    });
    
    // SEND EMAILS to owner and customer
    await sendOwnerBookingEmail(booking);
    await sendCustomerBookingEmail(booking);

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    // DUPLICATE KEY ERROR
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate payment detected",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// RAZORPAY WEBHOOK
export const razorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body)
      .digest("hex");

    // INVALID WEBHOOK
    if (signature !== expectedSignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid webhook signature",
      });
    }

    const event = req.body.event;

    // PAYMENT CAPTURED
    if (event === "payment.captured") {
      const paymentEntity = req.body.payload.payment.entity;

      console.log("Payment Captured:", paymentEntity.id);
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Webhook Error",
    });
  }
};
