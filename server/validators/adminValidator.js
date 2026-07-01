import { body } from "express-validator";

// Register Admin Validation
export const registerAdminValidation = [
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

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

// Login Admin Validation
export const loginAdminValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

// Update Admin Profile Validation
export const updateAdminProfileValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newEmail")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("newPassword")
    .optional({ checkFalsy: true })
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters"),
];