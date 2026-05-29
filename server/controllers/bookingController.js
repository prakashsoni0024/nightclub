import Booking from "../models/Booking.js";
import { TABLE_CAPACITY } from "../config/tableCapacity.js";

export const createBooking = async (req, res) => {
  try {
    const {
      name,
      phone,
      guests,
      bookingDate,
      tableType,
      paymentId,
      orderId,
    } = req.body;

    // validation
    if (
      !name ||
      !phone ||
      !guests ||
      !bookingDate ||
      !tableType
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const type = tableType.toUpperCase().trim();

    const totalTables = TABLE_CAPACITY[type];

    if (!totalTables) {
      return res.status(400).json({
        success: false,
        message: "Invalid table type",
      });
    }

    // COUNT ACTIVE BOOKINGS
    const bookedCount = await Booking.countDocuments({
      bookingDate,
      tableType: type,
      status: {
        $in: ["pending", "confirmed"],
      },
    });

    const available = totalTables - bookedCount;

    // FINAL SAFETY CHECK
    if (available <= 0) {
      return res.status(400).json({
        success: false,
        message: "No tables available",
      });
    }

    // CREATE BOOKING
    const booking = await Booking.create({
      name,
      phone,
      guests,
      bookingDate,
      tableType: type,
      paymentId,
      orderId,
      status: "confirmed",
    });

    return res.status(201).json({
      success: true,
      message: "Booking confirmed successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    const booking = await Booking.findOne({ orderId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "confirmed";
    booking.paymentId = paymentId;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking confirmed successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkAvailability = async (req, res) => {
  try {
    const { bookingDate, tableType } = req.body;

    if (!bookingDate || !tableType) {
      return res.status(400).json({
        success: false,
        message: "bookingDate and tableType are required",
      });
    }

    const type = tableType.toUpperCase().trim();

    const totalTables = TABLE_CAPACITY[type];

    if (!totalTables) {
      return res.status(400).json({
        success: false,
        message: "Invalid table type",
      });
    }

    // count active bookings
    const bookedCount = await Booking.countDocuments({
      bookingDate,
      tableType: type,
      status: {
        $in: ["pending", "confirmed"],
      },
    });

    const available = totalTables - bookedCount;

    return res.status(200).json({
      success: true,
      totalTables,
      bookedCount,
      available,
      isAvailable: available > 0,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAvailabilityStats =
  async (req, res) => {

    try {

      const today = new Date()
        .toISOString()
        .split("T")[0];



      const bookings =
        await Booking.find({
          bookingDate: today,
          status: "confirmed",
        });



      const limits = TABLE_CAPACITY;


      const counts = {
        REGULAR: 0,
        VIP: 0,
        PREMIUM_LOUNGE: 0,
      };



      bookings.forEach((booking) => {

        counts[booking.tableType]++;
      });



      return res.status(200).json({

        success: true,

        availability: {

          REGULAR:
            limits.REGULAR -
            counts.REGULAR,

          VIP:
            limits.VIP -
            counts.VIP,

          PREMIUM_LOUNGE:
            limits.PREMIUM_LOUNGE -
            counts.PREMIUM_LOUNGE,
        },
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
