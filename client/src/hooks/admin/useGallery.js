import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  uploadGalleryImage,
  getGallery,
  deleteGalleryImage,
} from "@/services/galleryService";

export default function useGallery() {
  const [gallery, setGallery] = useState([]);

  const [galleryLoading, setGalleryLoading] = useState(false);

  const [galleryDeleteLoading, setGalleryDeleteLoading] = useState(null);

  const [galleryFile, setGalleryFile] = useState(null);

  const [galleryLabel, setGalleryLabel] = useState("");

  const fetchGallery = async () => {
    try {
      const data = await getGallery();

      setGallery(data.images);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load gallery");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleGalleryUpload = async () => {
    try {
      if (!galleryFile || !galleryLabel) {
        toast.error("Image and label required");
        return;
      }

      setGalleryLoading(true);

      await uploadGalleryImage(galleryFile, galleryLabel);

      setGalleryFile(null);
      setGalleryLabel("");

      await fetchGallery();

      toast.success("Image uploaded");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      setGalleryDeleteLoading(id);

      await deleteGalleryImage(id);

      await fetchGallery();

      toast.success("Image deleted");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    } finally {
      setGalleryDeleteLoading(null);
    }
  };

  return {
    gallery,
    setGallery,

    galleryFile,
    setGalleryFile,

    galleryLabel,
    setGalleryLabel,

    galleryLoading,

    galleryDeleteLoading,

    fetchGallery,

    handleGalleryUpload,

    handleDeleteImage,
  };
}