import express from "express"; 
import {login , register } from "../controllers/auth.controllers.js";
import { authLimiter } from "../middleware/ratelimit.middleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/login" , authLimiter , login) 
router.post("/register", authLimiter , register)

router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router; 