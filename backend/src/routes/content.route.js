import express from "express"
import { getContent } from "../controllers/content.controller.js";
const router = express.Router();

router.get("/" , getContent ) ; 

export default router ; 