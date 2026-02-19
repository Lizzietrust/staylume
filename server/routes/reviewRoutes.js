import express from "express";
import {
  createReview,
  getHotelReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(getHotelReviews).post(protect, createReview);

router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

export default router;
