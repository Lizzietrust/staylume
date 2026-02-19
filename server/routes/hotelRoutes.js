import express from "express";
import {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotelController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getHotels).post(protect, authorize("admin"), createHotel);

router
  .route("/:id")
  .get(getHotel)
  .put(protect, authorize("admin"), updateHotel)
  .delete(protect, authorize("admin"), deleteHotel);

export default router;
