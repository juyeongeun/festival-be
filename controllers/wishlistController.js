import wishlistService from "../services/wishlistService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";

const createWishlist = asyncHandle(async (req, res, next) => {
  try {
    const { boothId, festivalId } = req.params;
    const { id: userId } = req.user;
    const { items } = req.body;
    const data = await wishlistService.createWishlist(
      parseInt(userId),
      parseInt(festivalId),
      parseInt(boothId),
      items
    );
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

const updateWishlist = asyncHandle(async (req, res, next) => {
  try {
    const { boothId, festivalId } = req.params;
    const { id: userId } = req.user;
    const { items } = req.body;
    const data = await wishlistService.updateWishlist(
      parseInt(userId),
      parseInt(festivalId),
      parseInt(boothId),
      items
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const deleteWishlist = asyncHandle(async (req, res, next) => {
  try {
    const { wishlistId, festivalId } = req.params;
    const { id: userId } = req.user;
    await wishlistService.deleteWishlist(
      parseInt(userId),
      parseInt(festivalId),
      parseInt(wishlistId)
    );
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

const getWishlists = asyncHandle(async (req, res, next) => {
  try {
    const { boothId, festivalId } = req.params;
    const { id: userId } = req.user;
    const data = await wishlistService.getWishlists(
      parseInt(userId),
      parseInt(festivalId),
      parseInt(boothId)
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default { createWishlist, updateWishlist, deleteWishlist, getWishlists };
