import MenuItem from "../models/MenuItem.js";
import Category from "../models/Category.js";
import asyncHandler from "../utils/asyncHandler.js";

// ======================================
// GET ALL MENU ITEMS
// ======================================
export const getMenu = asyncHandler(async (req, res) => {
  const filter = {
    isAvailable: true,
  };

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.type) {
    filter.type = req.query.type;
  }

  const menu = await MenuItem.find(filter)
    .populate("category", "name slug")
    .sort({
      displayOrder: 1,
      name: 1,
    });

  res.status(200).json({
    success: true,
    message: "Menu fetched successfully",
    data: menu,
  });
});

// ======================================
// GET FEATURED MENU
// ======================================
export const getFeaturedMenu = asyncHandler(async (req, res) => {
  const items = await MenuItem.find({
    isFeatured: true,
    isAvailable: true,
  })
    .populate("category", "name slug")
    .sort({
      displayOrder: 1,
      name: 1,
    });

  res.status(200).json({
    success: true,
    message: "Featured menu fetched successfully",
    data: items,
  });
});

// ======================================
// SEARCH MENU
// ======================================
export const searchMenu = asyncHandler(async (req, res) => {
  const q = req.query.q?.trim();

  if (!q) {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  const items = await MenuItem.find({
    isAvailable: true,
    $or: [
      {
        name: {
          $regex: q,
          $options: "i",
        },
      },
      {
        description: {
          $regex: q,
          $options: "i",
        },
      },
      {
        tags: {
          $in: [new RegExp(q, "i")],
        },
      },
    ],
  }).populate("category", "name slug");

  res.status(200).json({
    success: true,
    message: "Search completed successfully",
    data: items,
  });
});

// ======================================
// CREATE MENU ITEM
// ======================================
export const createMenu = asyncHandler(async (req, res) => {
  const {
    name,
    slug,
    description,
    price,
    image,
    category,
    type,
    isVeg,
    isSpicy,
    isFeatured,
    isAvailable,
    displayOrder,
    preparationTime,
    tags,
  } = req.body;

  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  const existingMenu = await MenuItem.findOne({
    slug: slug.trim().toLowerCase(),
  });

  if (existingMenu) {
    return res.status(409).json({
      success: false,
      message: "Menu item slug already exists",
    });
  }

  const menu = await MenuItem.create({
    name: name.trim(),
    slug: slug.trim().toLowerCase(),
    description,
    price,
    image,
    category,
    type,
    isVeg,
    isSpicy,
    isFeatured,
    isAvailable,
    displayOrder,
    preparationTime,
    tags,
  });

  res.status(201).json({
    success: true,
    message: "Menu item created successfully",
    data: menu,
  });
});

// ======================================
// UPDATE MENU ITEM
// ======================================
export const updateMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const menu = await MenuItem.findById(id);

  if (!menu) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found",
    });
  }

  if (req.body.category) {
    const categoryExists = await Category.findById(req.body.category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
  }

  if (req.body.slug) {
    const duplicate = await MenuItem.findOne({
      _id: { $ne: id },
      slug: req.body.slug.trim().toLowerCase(),
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Slug already exists",
      });
    }
  }

  Object.assign(menu, req.body);

  await menu.save();

  res.status(200).json({
    success: true,
    message: "Menu item updated successfully",
    data: menu,
  });
});

// ======================================
// DELETE MENU ITEM
// ======================================
export const deleteMenu = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const menu = await MenuItem.findById(id);

  if (!menu) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found",
    });
  }

  await menu.deleteOne();

  res.status(200).json({
    success: true,
    message: "Menu item deleted successfully",
  });
});


export const getMenuBySlug = asyncHandler(async (req, res) => {
  const item = await MenuItem.findOne({
    slug: req.params.slug,
    isAvailable: true,
  }).populate("category", "name slug");

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found",
    });
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});

export const getRelatedMenu = asyncHandler(async (req, res) => {
  const item = await MenuItem.findOne({
    slug: req.params.slug,
  });

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found",
    });
  }

  const related = await MenuItem.find({
    category: item.category,
    _id: { $ne: item._id },
    isAvailable: true,
  })
    .limit(4)
    .sort({
      displayOrder: 1,
    });

  res.status(200).json({
    success: true,
    data: related,
  });
});