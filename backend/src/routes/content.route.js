import express from "express"
import { example, getContent } from "../controllers/content.controller.js";
const router = express.Router();

router.get("/" , getContent ) ; 
router.get("/ex", example);

export default router ; 