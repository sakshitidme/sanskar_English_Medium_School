import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import path from "path";

const router = express.Router();

// Function to generate the public URL for uploaded files
const getFileUrl = (req, filename) => {
  if (!filename) return null;
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

// Route to handle multiple image uploads for admissions
// The fields must match the formData keys expected in the frontend.
router.post(
  "/",
  upload.fields([
    { name: "childPhoto", maxCount: 1 },
    { name: "fatherPhoto", maxCount: 1 },
    { name: "motherPhoto", maxCount: 1 },
    { name: "fatherSignature", maxCount: 1 },
    { name: "motherSignature", maxCount: 1 },
  ]),
  (req, res) => {
    try {
      if (!req.files) {
        return res.status(400).json({ message: "No files were uploaded." });
      }

      // Construct a response object containing URLs for uploaded files
      const uploadedFiles = {
        childPhotoUrl: req.files.childPhoto ? getFileUrl(req, req.files.childPhoto[0].filename) : null,
        fatherPhotoUrl: req.files.fatherPhoto ? getFileUrl(req, req.files.fatherPhoto[0].filename) : null,
        motherPhotoUrl: req.files.motherPhoto ? getFileUrl(req, req.files.motherPhoto[0].filename) : null,
        fatherSignatureUrl: req.files.fatherSignature ? getFileUrl(req, req.files.fatherSignature[0].filename) : null,
        motherSignatureUrl: req.files.motherSignature ? getFileUrl(req, req.files.motherSignature[0].filename) : null,
      };

      res.status(200).json({
        message: "Files uploaded successfully",
        urls: uploadedFiles,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "File upload failed", error: error.message });
    }
  }
);

export default router;
