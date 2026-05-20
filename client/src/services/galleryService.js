import API from "./api";

export const getGallery = async () => {
  const res = await API.get("/gallery");
  return res.data;
};

export const uploadGalleryImage = async (file, label) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("label", label);

  const res = await API.post("/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const deleteGalleryImage = async (id) => {
  const res = await API.delete(`/gallery/${id}`);
  return res.data;
};