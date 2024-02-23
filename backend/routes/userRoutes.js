import express from "express";
import protectRoute from "../middlerware/protectRoute.js";
import { getUserForSidebar } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protectRoute, getUserForSidebar);

export default router;
