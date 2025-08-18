import express from "express"
import { toggleBookMarks,getBookMarks, toggleProgress, getProgress } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/bookmarks", protectRoute, getBookMarks);
router.post("/bookmarks/:id", protectRoute, toggleBookMarks);
router.post("/progress/:id", protectRoute, toggleProgress);
router.get("/progress", protectRoute, getProgress);

export default router; 