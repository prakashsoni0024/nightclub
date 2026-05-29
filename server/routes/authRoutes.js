import express from "express";
import {
  loginAdmin,
  registerAdmin,
  verifyAdmin,
} from "../controllers/authController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/verify", protectAdmin, verifyAdmin);

export default router;
