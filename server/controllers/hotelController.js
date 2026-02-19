import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";

export const getHotels = async (req, res, next) => {
  try {
    const {
      location,
      checkIn,
      checkOut,
      guests,
      minPrice,
      maxPrice,
      amenities,
      rating,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (location) {
      filter.$or = [
        { city: { $regex: location, $options: "i" } },
        { country: { $regex: location, $options: "i" } },
        { address: { $regex: location, $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }

    if (amenities) {
      filter.amenities = { $all: amenities.split(",") };
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    // Check availability for dates
    if (checkIn && checkOut) {
      // Get hotels with available rooms for these dates
      const bookedHotelIds = await getBookedHotels(checkIn, checkOut);
      filter._id = { $nin: bookedHotelIds };
    }

    // Sort options
    let sort = {};
    if (sortBy === "price_asc") sort.pricePerNight = 1;
    else if (sortBy === "price_desc") sort.pricePerNight = -1;
    else if (sortBy === "rating") sort.rating = -1;
    else if (sortBy === "newest") sort.createdAt = -1;
    else sort.createdAt = -1;

    // Pagination
    const skip = (page - 1) * limit;

    const hotels = await Hotel.find(filter)
      .sort(sort)
      .limit(Number(limit))
      .skip(skip)
      .populate("rooms", "roomType price capacity");

    const total = await Hotel.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: hotels.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: hotels,
    });
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
      .populate("rooms")
      .populate("reviews");

    if (!hotel) {
      return res.status(404).json({
        success: false,
        error: "Hotel not found",
      });
    }

    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};


export const createHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.create(req.body);

    res.status(201).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        error: "Hotel not found",
      });
    }

    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        error: "Hotel not found",
      });
    }

    // Delete all rooms associated with this hotel
    await Room.deleteMany({ hotel: req.params.id });

    // Delete the hotel
    await hotel.deleteOne();

    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to get booked hotels
const getBookedHotels = async (checkIn, checkOut) => {
  const bookings = await Booking.find({
    $or: [
      {
        checkIn: { $lte: new Date(checkOut) },
        checkOut: { $gte: new Date(checkIn) },
      },
    ],
    status: { $in: ["confirmed", "pending"] },
  });

  return [...new Set(bookings.map((b) => b.hotel.toString()))];
};
