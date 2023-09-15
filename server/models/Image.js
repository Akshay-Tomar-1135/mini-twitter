import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
    {
        data: Buffer, // Store the image data as Buffer
        contentType: String, // Store the content type of the image (e.g., "image/jpeg")
    },
    { timestamps: true }
);
  
export default mongoose.model("Image", ImageSchema);
  