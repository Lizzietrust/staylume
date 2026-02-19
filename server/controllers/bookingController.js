import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export const createBooking = async (req, res, next) => {
  try {
    const { hotelId, roomId, checkIn, checkOut, guests, specialRequests } =
      req.body;

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return res.status(400).json({
        success: false,
        error: "Check-in date cannot be in the past",
      });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        error: "Check-out date must be after check-in date",
      });
    }

    // Check room availability
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        error: "Room not found",
      });
    }

    // Check if room is available for these dates
    const conflictingBookings = await Booking.find({
      room: roomId,
      status: { $in: ["confirmed", "pending"] },
      $or: [
        {
          checkIn: { $lte: checkOutDate },
          checkOut: { $gte: checkInDate },
        },
      ],
    });

    if (conflictingBookings.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Room not available for selected dates",
      });
    }

    // Calculate number of nights
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
    );

    // Calculate total price
    const totalPrice = room.price * nights;

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      hotel: hotelId,
      room: roomId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      nights,
      totalPrice,
      specialRequests,
      bookingNumber: generateBookingNumber(),
    });

    // Populate booking details
    await booking.populate([
      { path: "hotel", select: "name address" },
      { path: "room", select: "roomType" },
    ]);

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter = { user: req.user.id };
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .populate("hotel", "name address images")
      .populate("room", "roomType images")
      .sort("-createdAt")
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("hotel")
      .populate("room")
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    // Check if user owns this booking or is admin
    if (
      booking.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to view this booking",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    // Check if user owns this booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Not authorized to cancel this booking",
      });
    }

    // Check if booking can be cancelled
    const checkInDate = new Date(booking.checkIn);
    const today = new Date();

    if (checkInDate <= today) {
      return res.status(400).json({
        success: false,
        error: "Cannot cancel booking that has already started",
      });
    }

    // Calculate cancellation fee based on policy
    const daysUntilCheckIn = Math.ceil(
      (checkInDate - today) / (1000 * 60 * 60 * 24),
    );

    let cancellationFee = 0;
    if (daysUntilCheckIn <= 1) {
      cancellationFee = booking.totalPrice; // 100% fee
    } else if (daysUntilCheckIn <= 3) {
      cancellationFee = booking.totalPrice * 0.5; // 50% fee
    } else if (daysUntilCheckIn <= 7) {
      cancellationFee = booking.totalPrice * 0.25; // 25% fee
    }

    booking.status = "cancelled";
    booking.cancellationDetails = {
      cancelledAt: new Date(),
      cancelledBy: req.user.id,
      reason: req.body.reason,
      refundAmount: booking.totalPrice - cancellationFee,
    };

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: {
        refundAmount: booking.cancellationDetails.refundAmount,
        cancellationFee,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookingCalendar = async (req, res, next) => {
  try {
    const { month, year, hotelId } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const filter = {
      checkIn: { $lte: endDate },
      checkOut: { $gte: startDate },
    };

    if (hotelId) filter.hotel = hotelId;

    const bookings = await Booking.find(filter)
      .populate("hotel", "name")
      .populate("room", "roomType")
      .populate("user", "name")
      .sort("checkIn");

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to generate booking number
const generateBookingNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BK-${timestamp}-${random}`;
};
