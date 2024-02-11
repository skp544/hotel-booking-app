import express from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/auth";
import { body } from "express-validator";
import { createHotel } from "../controllers/hotelController";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 5 } });

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricerPerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities is required"),
  ],
  upload.array("imageFiles", 6),
  createHotel
);

export default router;
