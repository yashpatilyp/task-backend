import express from "express";
import {  Login, Register } from "../controllers/userController.js";

const router = express.Router();


router.post("/signup", Register);
router.post("/login", Login);
  

export default router;
