import express from "express";
import { bookingValidation } from "../validators/bookingValidator.js";
import { validate } from "../middleware/validationMiddleware.js";

import {
  createBooking,
  getBookings,
  deleteBooking,
  checkAvailability,
  confirmBooking,
  getAvailabilityStats,
  downloadBookingReport,
} from "../controllers/bookingController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// SaaS FLOW ROUTES
router.post("/check-availability", checkAvailability);
router.post("/", bookingValidation, validate, createBooking);
router.post("/confirm", confirmBooking);

// ADMIN ROUTES
router.get("/", getBookings);
router.delete("/:id", protectAdmin, deleteBooking);
router.get("/availability-stats", protectAdmin, getAvailabilityStats);
router.get("/report", protectAdmin, downloadBookingReport);

export default router;
