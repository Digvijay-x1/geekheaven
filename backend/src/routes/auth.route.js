import express from "express"; 
import {login , register } from "../controllers/auth.controllers.js";
import { authLimiter } from "../middleware/ratelimit.middleware.js";
const router = express.Router();

router.post("/login" , authLimiter , login) 
router.post("/register", authLimiter , register)

export default router; 