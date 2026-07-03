import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    bookingDate: {
      type: String,
      required: true,
    },

    tableType: {
      type: String,
      required: true,
      enum: ["REGULAR", "VIP", "PREMIUM_LOUNGE"],
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },

    paymentId: {
      type: String,
      unique: true,
      sparse: true,
    },

    orderId: {
      type: String,
      unique: true,
      sparse: true,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// prevent overbooking query optimization
bookingSchema.index({
  bookingDate: 1,
  tableType: 1,
  status: 1,
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
