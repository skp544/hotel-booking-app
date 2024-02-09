import express from "express";
import { check } from "express-validator";
import {
  loginUser,
  registerUser,
  validateToken,
} from "../controllers/userController";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "Please enter your first name").isString(),
    check("lastName", "Please enter your last name").isString(),
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  registerUser
);

router.post("/login", [
  check("email", "Email is required").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  loginUser,
]);

router.get("/validate-token", verifyToken, validateToken);

export default router;
