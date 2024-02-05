import cors from "cors";
import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
