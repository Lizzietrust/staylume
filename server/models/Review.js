import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    rating: {
      type: Number,
      required: [true, "Please add a rating"],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please add a comment"],
      maxlength: 1000,
    },
    categories: {
      cleanliness: {
        type: Number,
        min: 1,
        max: 5,
      },
      comfort: {
        type: Number,
        min: 1,
        max: 5,
      },
      location: {
        type: Number,
        min: 1,
        max: 5,
      },
      facilities: {
        type: Number,
        min: 1,
        max: 5,
      },
      staff: {
        type: Number,
        min: 1,
        max: 5,
      },
      valueForMoney: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    images: [
      {
        url: String,
        caption: String,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    helpful: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    response: {
      comment: String,
      respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      respondedAt: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Ensure one review per user per hotel
reviewSchema.index({ user: 1, hotel: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
