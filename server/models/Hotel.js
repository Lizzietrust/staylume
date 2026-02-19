import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a hotel name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    city: {
      type: String,
      required: [true, "Please add a city"],
    },
    country: {
      type: String,
      required: [true, "Please add a country"],
    },
    images: [
      {
        url: String,
        caption: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    pricePerNight: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
        enum: [
          "WiFi",
          "Parking",
          "Pool",
          "Spa",
          "Gym",
          "Restaurant",
          "Room Service",
          "Air Conditioning",
          "Breakfast",
          "Bar",
          "Pet Friendly",
          "Airport Shuttle",
          "24/7 Front Desk",
          "Laundry",
        ],
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        index: "2dsphere",
      },
    },
    contactInfo: {
      phone: String,
      email: String,
      website: String,
    },
    policies: {
      checkIn: { type: String, default: "14:00" },
      checkOut: { type: String, default: "11:00" },
      cancellationPolicy: {
        type: String,
        enum: ["flexible", "moderate", "strict"],
        default: "moderate",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

hotelSchema.virtual("rooms", {
  ref: "Room",
  localField: "_id",
  foreignField: "hotel",
});

hotelSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "hotel",
});

/* Indexes */
hotelSchema.index({ location: "2dsphere" });
hotelSchema.index({
  name: "text",
  description: "text",
  city: "text",
  country: "text",
});

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
