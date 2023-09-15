import express from "express";
import { verifyToken } from "../verifyToken.js";
import User from "../models/User.js";
import Image from "../models/Image.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload/userpic/:id", upload.single('imageData'), async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Check if the user exists
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      if (!req.file) {
        return res.status(400).json({ message: "No image data provided." });
      }
  
      // Create a new Image document with the binary data and content type
    //   const newImage = new Image({
    //     data: req.file.buffer,
    //     contentType: req.file.mimetype, // Use the MIME type from Multer
    //   });
  
    //   // Save the image to the MongoDB database
    //   await newImage.save();
  
      // Update the user's profile picture with the image ID
      user.profilePicture = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
  
      await user.save();
  
      res.status(201).json({ imageData: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }, message: "Image uploaded and profile picture updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading image." });
    }
});

// router.post("/upload/tweet/:id", upload.single('imageData'), async (req, res) => {
//   try {
//     const userId = req.params.id;

//     // Check if the user exists
//     const user = await User.findById(userId);
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "No image data provided." });
//     }

//     // Create a new Image document with the binary data and content type
//   //   const newImage = new Image({
//   //     data: req.file.buffer,
//   //     contentType: req.file.mimetype, // Use the MIME type from Multer
//   //   });

//   //   // Save the image to the MongoDB database
//   //   await newImage.save();

//     // Update the user's profile picture with the image ID
//     user.profilePicture = {
//       data: req.file.buffer,
//       contentType: req.file.mimetype,
//     };

//     await user.save();

//     res.status(201).json({ imageData: {
//       data: req.file.buffer,
//       contentType: req.file.mimetype,
//     }, message: "Image uploaded and profile picture updated successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error uploading image." });
//   }
// });

export default router;