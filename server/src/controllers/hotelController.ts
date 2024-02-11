import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import multer from "multer";
import { HotelType } from "../types";
import Hotel from "../models/hotelModel";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const createHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];

    const newHotel: HotelType = req.body;

    // Upload images to cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = `data:${image.mimetype};base64,${b64}`;

      const res = await cloudinary.uploader.upload(dataURI, {
        folder: process.env.CLODUDINARY_FOLDER_NAME,
      });

      return res.url;
    });

    // Wait for all images to be uploaded
    const imageUrls = await Promise.all(uploadPromises);

    // Add imageUrls to newHotel
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    // Create hotel
    const hotel = new Hotel(newHotel);
    hotel.save();

    return res
      .status(201)
      .json({ success: true, hotel, message: "Hotel created" });
  } catch (error) {
    console.log("Error in createHotel controller");
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};
