import mongoose from "mongoose";
import Review from "../models/Review.js";
import Hotel from "../models/Hotel.js";

export const createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    // Check if user already reviewed this hotel
    const existingReview = await Review.findOne({
      user: req.user.id,
      hotel: req.params.hotelId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        error: "You have already reviewed this hotel",
      });
    }

    // Create review
    const review = await Review.create({
      user: req.user.id,
      hotel: req.params.hotelId,
      rating,
      comment,
    });

    // Update hotel rating
    await updateHotelRating(req.params.hotelId);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const getHotelReviews = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({ hotel: req.params.hotelId })
      .populate("user", "name avatar")
      .sort("-createdAt")
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await Review.countDocuments({ hotel: req.params.hotelId });

    // Calculate average rating
    const ratings = await Review.aggregate([
      { $match: { hotel: new mongoose.Types.ObjectId(req.params.hotelId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          ratingCounts: {
            $push: "$rating",
          },
        },
      },
    ]);

    const ratingDistribution =
      ratings[0]?.ratingCounts.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {}) || {};

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      averageRating: ratings[0]?.averageRating || 0,
      ratingDistribution,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: "Review not found",
      });
    }

    // Check if user owns this review
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to update this review",
      });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    // Update hotel rating
    await updateHotelRating(review.hotel);

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: "Review not found",
      });
    }

    // Check if user owns this review or is admin
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Not authorized to delete this review",
      });
    }

    const hotelId = review.hotel;
    await review.deleteOne();

    // Update hotel rating
    await updateHotelRating(hotelId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to update hotel rating
const updateHotelRating = async (hotelId) => {
  const result = await Review.aggregate([
    { $match: { hotel: new mongoose.Types.ObjectId(hotelId) } },
    {
      $group: {
        _id: "$hotel",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  if (result.length > 0) {
    await Hotel.findByIdAndUpdate(hotelId, {
      rating: result[0].averageRating.toFixed(1),
      totalReviews: result[0].totalReviews,
    });
  }
};
