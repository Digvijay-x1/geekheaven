import express from "express"
import { SuperContentSearch, getContent } from "../controllers/content.controller.js";
const router = express.Router();

router.get("/" , getContent ) ; 
router.get("/q", SuperContentSearch);

export default router ; 