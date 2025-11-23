import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createPaymentIntent } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-intent", protect, createPaymentIntent);

export default router;