import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
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
      trim: true,
      maxlength: 500,
      default: "",
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      trim: true,
      default: "",
    },

    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


categorySchema.index({
  displayOrder: 1,
  isActive: 1,
});

categorySchema.virtual("menuItems", {
  ref: "MenuItem",
  localField: "_id",
  foreignField: "category",
});

const Category = mongoose.model("Category", categorySchema);

export default Category;