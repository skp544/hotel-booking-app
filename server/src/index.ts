import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDatabase from "./config/database";
import userRoutes from "./routes/userRoute";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDatabase();

const PORT = process.env.PORT || 8000;

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/api/v1/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
