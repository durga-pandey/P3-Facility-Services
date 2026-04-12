import cloudinary from "./cloudinaryConfig.js";

export const uploadToCloudinary = async (file, folder) => {
  if (!file) return null;
  const result = await cloudinary.uploader.upload(file.path, {
    folder,
  });
  return { public_id: result.public_id, secure_url: result.secure_url };
};

export const deleteImage = async (imageObj) => {
  if (!imageObj || !imageObj.public_id) return;
  try {
    await cloudinary.uploader.destroy(imageObj.public_id);
  } catch (error) {
    console.error("Cloudinary image deletion error:", error.message);
    throw new Error("Failed to delete image from Cloudinary");
  }
};
