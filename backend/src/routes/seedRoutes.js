import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { seedProducts, resetStoreData, seedStatus } from "../controllers/seedController.js";

const router = express.Router();

router.get("/status", protect, adminOnly, seedStatus);
router.post("/products", protect, adminOnly, seedProducts);
router.post("/reset", protect, adminOnly, resetStoreData);

export default router;