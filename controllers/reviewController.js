import reviewService from "../services/reviewService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";

const createReviewController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { boothId } = req.params;
    const { content, score } = req.body;
    const data = await reviewService.createReview(
      parseInt(userId),
      parseInt(boothId),
      content,
      parseInt(score)
    );
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

const getReviewController = asyncHandle(async (req, res, next) => {
  try {
    const {
      boothId = "",
      page = 1,
      pageSize = 5,
      orderBy = "recent",
      keyword = "",
      startDate = "",
      endDate = "",
      scoreOrder = "high",
    } = req.query;
    const data = await reviewService.getReview(
      parseInt(boothId),
      page,
      pageSize,
      orderBy,
      keyword,
      startDate,
      endDate,
      scoreOrder
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const deleteReviewController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId, role: userRole } = req.user;
    const { reviewId } = req.params;
    const data = await reviewService.deleteReview(userRole, parseInt(reviewId));
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default {
  createReview: createReviewController,
  getReview: getReviewController,
  deleteReview: deleteReviewController,
};
