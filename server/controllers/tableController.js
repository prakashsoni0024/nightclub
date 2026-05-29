import Booking from "../models/bookingModel.js";
import { TABLE_CAPACITY } from "../config/tableCapacity.js";

export const checkAvailability = async (req, res) => {
  try {
    const { date, tableType } = req.body;

    const type = tableType.toUpperCase();

    const totalTables = TABLE_CAPACITY[type];

    if (!totalTables) {
      return res.status(400).json({
        success: false,
        message: "Invalid table type",
      });
    }

    // ONLY CONFIRMED BOOKINGS COUNT HOGA
    const bookedCount = await Booking.countDocuments({
      bookingDate: date,
      tableType: type,
      status: "confirmed",
    });

    const available = totalTables - bookedCount;

    if (available <= 0) {
      return res.json({
        success: false,
        available: 0,
        message: "All tables are booked for this date",
      });
    }

    return res.json({
      success: true,
      available,
      message: `${available} tables available`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};