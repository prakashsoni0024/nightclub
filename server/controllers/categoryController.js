import Category from "../models/Category.js";
import MenuItem from "../models/MenuItem.js";
import asyncHandler from "../utils/asyncHandler.js";

// ======================================
// GET ALL CATEGORIES
// ======================================
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({
    displayOrder: 1,
    name: 1,
  });

  res.status(200).json({
    success: true,
    message: "Categories fetched successfully",
    data: categories,
  });
});

// ======================================
// CREATE CATEGORY
// ======================================
export const createCategory = asyncHandler(async (req, res) => {
  const {
    name,
    slug,
    description,
    image,
    icon,
    displayOrder,
    isActive,
  } = req.body;

  const existingCategory = await Category.findOne({
    $or: [
      { name: name.trim() },
      { slug: slug.trim().toLowerCase() },
    ],
  });

  if (existingCategory) {
    return res.status(409).json({
      success: false,
      message: "Category already exists",
    });
  }

  const category = await Category.create({
    name: name.trim(),
    slug: slug.trim().toLowerCase(),
    description,
    image,
    icon,
    displayOrder,
    isActive,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

// ======================================
// UPDATE CATEGORY
// ======================================
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  const duplicate = await Category.findOne({
    _id: { $ne: id },
    $or: [
      { name: req.body.name },
      { slug: req.body.slug },
    ],
  });

  if (duplicate) {
    return res.status(409).json({
      success: false,
      message: "Category name or slug already exists",
    });
  }

  Object.assign(category, req.body);

  await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
});

// ======================================
// DELETE CATEGORY
// ======================================
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  const menuCount = await MenuItem.countDocuments({
    category: id,
  });

  if (menuCount > 0) {
    return res.status(409).json({
      success: false,
      message: "Cannot delete category with existing menu items.",
    });
  }

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});