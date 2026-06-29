import { body } from "express-validator";

export const bookingValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("phone")
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid 10 digit mobile number"),

  body("guests")
    .isInt({ min: 1, max: 10 })
    .withMessage("Guests must be between 1 and 10"),

  body("bookingDate")
    .notEmpty()
    .withMessage("Booking date is required")
    .isISO8601()
    .withMessage("Invalid booking date"),

  body("tableType")
    .isIn(["REGULAR", "VIP", "PREMIUM_LOUNGE"])
    .withMessage("Invalid table type"),
];