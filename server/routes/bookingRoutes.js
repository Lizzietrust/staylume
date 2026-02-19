import express from "express";
import {
  createBooking,
  getUserBookings,
  getBooking,
  cancelBooking,
  updateBookingStatus,
  getBookingCalendar,
} from "../controllers/bookingController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").post(createBooking).get(getUserBookings);

router.get("/calendar", authorize("admin"), getBookingCalendar);
router.get("/:id", getBooking);
router.put("/:id/cancel", cancelBooking);
router.put("/:id/status", authorize("admin"), updateBookingStatus);

export default router;
