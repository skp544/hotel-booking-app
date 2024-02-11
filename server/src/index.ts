import cookieparser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cloudinaryConnect from "./config/cloudinary";
import connectDatabase from "./config/database";
import hotelRoutes from "./routes/hotelRoute";
import userRoutes from "./routes/userRoute";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.urlencoded({ extended: true }));

connectDatabase();
cloudinaryConnect();

const PORT = process.env.PORT || 8000;

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/my-hotels", hotelRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
