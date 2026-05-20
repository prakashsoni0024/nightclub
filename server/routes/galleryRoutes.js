import express from "express";
import upload from "../middleware/upload.js";
import {
  getGallery,
  addImage,
  deleteImage,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGallery);
router.post("/", upload.single("image"), addImage);
router.delete("/:id", deleteImage);

export default router;