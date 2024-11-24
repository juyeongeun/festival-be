import commentService from "../services/commentService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";

const createComment = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { boardId, festivalId } = req.params;
    const { content } = req.body;
    const data = await commentService.createComment(
      parseInt(userId),
      parseInt(festivalId),
      parseInt(boardId),
      content
    );
    return res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

const getComments = asyncHandle(async (req, res, next) => {
  try {
    const { boardId, festivalId } = req.params;
    const { id: userId } = req.user;
    const { page = 1, pageSize = 5, orderBy = "recent" } = req.query;
    const data = await commentService.getComments(
      parseInt(festivalId),
      parseInt(boardId),
      parseInt(userId),
      parseInt(page),
      parseInt(pageSize),
      orderBy
    );
    return res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const updateComment = asyncHandle(async (req, res, next) => {
  try {
    const { commentId, festivalId } = req.params;
    const { content } = req.body;
    const { id: userId } = req.user;
    const data = await commentService.updateComment(
      parseInt(commentId),
      parseInt(festivalId),
      parseInt(userId),
      content
    );
    return res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default { createComment, getComments, updateComment };
