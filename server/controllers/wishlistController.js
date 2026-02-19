import Wishlist from "../models/Wishlist.js";

export const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate({
      path: "hotels",
      select: "name address city country pricePerNight images rating",
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.id, hotels: [] });
    }

    res.status(200).json({
      success: true,
      count: wishlist.hotels.length,
      data: wishlist.hotels,
    });
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { hotelId } = req.params;

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        hotels: [hotelId],
      });
    } else {
      // Check if hotel already in wishlist
      if (wishlist.hotels.includes(hotelId)) {
        return res.status(400).json({
          success: false,
          error: "Hotel already in wishlist",
        });
      }

      wishlist.hotels.push(hotelId);
      await wishlist.save();
    }

    res.status(200).json({
      success: true,
      message: "Hotel added to wishlist",
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { hotelId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        error: "Wishlist not found",
      });
    }

    wishlist.hotels = wishlist.hotels.filter((id) => id.toString() !== hotelId);

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Hotel removed from wishlist",
    });
  } catch (error) {
    next(error);
  }
};
