import express from "express";

import {
  getMenu,
  getFeaturedMenu,
  searchMenu,
  createMenu,
  updateMenu,
  deleteMenu,
  getMenuBySlug,
  getRelatedMenu,
} from "../controllers/menuController.js";

import {
  createMenuValidation,
  updateMenuValidation,
  menuSearchValidation,
} from "../validators/menuValidator.js";

import { validate } from "../middleware/validationMiddleware.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ====================
// PUBLIC
// ====================

router.get("/", getMenu);

router.get("/featured", getFeaturedMenu);

router.get(
  "/search",
  menuSearchValidation,
  validate,
  searchMenu
);

router.get("/:slug/related", getRelatedMenu);

router.get("/:slug", getMenuBySlug);

// ====================
// ADMIN
// ====================

router.post(
  "/",
  protectAdmin,
  createMenuValidation,
  validate,
  createMenu
);

router.put(
  "/:id",
  protectAdmin,
  updateMenuValidation,
  validate,
  updateMenu
);

router.delete(
  "/:id",
  protectAdmin,
  deleteMenu
);

export default router;