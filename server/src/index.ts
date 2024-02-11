import cookieparser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import cloudinaryConnect from "./config/cloudinary";
import connectDatabase from "./config/database";
import userRoutes from "./routes/userRoute";

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
