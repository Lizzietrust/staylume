import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    roomNumber: {
      type: String,
      required: [true, "Please add a room number"],
    },
    roomType: {
      type: String,
      enum: ["single", "double", "twin", "suite", "family", "deluxe"],
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    capacity: {
      adults: {
        type: Number,
        required: true,
        min: 1,
      },
      children: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    price: {
      type: Number,
      required: [true, "Please add price per night"],
      min: 0,
    },
    amenities: [
      {
        type: String,
        enum: [
          "TV",
          "AC",
          "WiFi",
          "Mini Bar",
          "Safe",
          "Bathtub",
          "Shower",
          "Hair Dryer",
          "Coffee Maker",
          "Balcony",
          "Ocean View",
          "City View",
        ],
      },
    ],
    images: [
      {
        url: String,
        caption: String,
        isPrimary: Boolean,
      },
    ],
    beds: [
      {
        type: {
          type: String,
          enum: ["single", "double", "queen", "king", "bunk"],
        },
        count: Number,
      },
    ],
    size: {
      value: Number,
      unit: {
        type: String,
        enum: ["sqm", "sqft"],
        default: "sqm",
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
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

// Ensure unique room numbers per hotel
roomSchema.index({ hotel: 1, roomNumber: 1 }, { unique: true });

const Room = mongoose.model("Room", roomSchema);
export default Room;
