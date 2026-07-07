import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["Food", "Drink"],
      required: true,
      index: true,
    },

    isVeg: {
      type: Boolean,
      default: false,
    },

    isSpicy: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
    },

    preparationTime: {
      type: Number,
      min: 1,
      default: null,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// =========================
// Indexes
// =========================

menuItemSchema.index({
  category: 1,
  displayOrder: 1,
});

menuItemSchema.index({
  type: 1,
  isAvailable: 1,
});

menuItemSchema.index({
  isFeatured: 1,
  isAvailable: 1,
});

menuItemSchema.index({
  name: "text",
  description: "text",
  tags: "text",
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;