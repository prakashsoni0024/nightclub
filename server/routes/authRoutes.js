import express from "express";

import {
  loginAdmin,
  registerAdmin,
  verifyAdmin,
  updateAdminProfile,
} from "../controllers/authController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validationMiddleware.js";

import {
  loginAdminValidation,
  registerAdminValidation,
  updateAdminProfileValidation,
} from "../validators/adminValidator.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/register", registerAdminValidation, validate, registerAdmin);

router.post("/login", loginAdminValidation, validate, loginAdmin);

// PROTECTED ROUTES
router.get("/verify", protectAdmin, verifyAdmin);

router.put(
  "/update-profile",
  protectAdmin,
  updateAdminProfileValidation,
  validate,
  updateAdminProfile,
);

export default router;
