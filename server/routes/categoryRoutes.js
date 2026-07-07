import express from "express";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import {
  createCategoryValidation,
  updateCategoryValidation,
} from "../validators/categoryValidator.js";

import { validate } from "../middleware/validationMiddleware.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ====================
// PUBLIC
// ====================

router.get("/", getCategories);

// ====================
// ADMIN
// ====================

router.post(
  "/",
  protectAdmin,
  createCategoryValidation,
  validate,
  createCategory
);

router.put(
  "/:id",
  protectAdmin,
  updateCategoryValidation,
  validate,
  updateCategory
);

router.delete(
  "/:id",
  protectAdmin,
  deleteCategory
);

export default router;