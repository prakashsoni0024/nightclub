import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

// GET all images
export const getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD image
export const addImage = async (req, res) => {
  try {
    const file = req.file;
    const { label } = req.body;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    if (!label) {
      return res.status(400).json({
        success: false,
        message: "Label is required",
      });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "nightclub/gallery" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(file.buffer);
    });

    const image = await Gallery.create({
      imageUrl: result.secure_url,
      label,
    });

    res.status(201).json({
      success: true,
      image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE image
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Image deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};