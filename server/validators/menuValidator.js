import { body, param, query } from "express-validator";

export const createMenuValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Menu name is required")
    .isLength({ max: 120 })
    .withMessage("Menu name cannot exceed 120 characters"),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required")
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Invalid slug"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

  body("image")
    .trim()
    .notEmpty()
    .withMessage("Image is required"),

  body("category")
    .isMongoId()
    .withMessage("Invalid category"),

  body("type")
    .isIn(["Food", "Drink"])
    .withMessage("Type must be Food or Drink"),

  body("isVeg")
    .optional()
    .isBoolean(),

  body("isSpicy")
    .optional()
    .isBoolean(),

  body("isFeatured")
    .optional()
    .isBoolean(),

  body("isAvailable")
    .optional()
    .isBoolean(),

  body("displayOrder")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Display order must be a positive integer"),

  body("preparationTime")
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage("Preparation time must be at least 1 minute"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("tags.*")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Each tag can have a maximum of 50 characters"),
];

export const updateMenuValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid menu item id"),

  ...createMenuValidation,
];

export const menuSearchValidation = [
  query("q")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search query must be between 1 and 100 characters"),
];

export const deleteValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid id"),
];