import commentService from "../services/commentService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";

const createComment = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId, nickname } = req.user;
    const { boardId, festivalId } = req.params;
    const { content } = req.body;
    const data = await commentService.createComment(
      parseInt(userId),
      parseInt(festivalId),
      parseInt(boardId),
      content,
      nickname
    );
    return res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

const getComments = asyncHandle(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { page = 1, pageSize = 5, orderBy = "recent" } = req.query;
    const data = await commentService.getComments(
      parseInt(boardId),
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

const deleteComment = asyncHandle(async (req, res, next) => {
  try {
    const { commentId, festivalId } = req.params;
    const { id: userId, role: userRole } = req.user;
    await commentService.deleteComment(
      parseInt(commentId),
      parseInt(festivalId),
      parseInt(userId),
      userRole
    );
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default { createComment, getComments, updateComment, deleteComment };
