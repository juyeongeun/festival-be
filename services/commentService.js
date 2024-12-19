import commentRepository from "../repositorys/commentRepository.js";
import checkUser from "../utils/checkUser.js";
import notificationRepository from "../repositorys/notificationRepository.js";
import boardRepository from "../repositorys/boardRepository.js";
import { sendNotification } from "../app.js";

const createComment = async (
  userId,
  festivalId,
  boardId,
  content,
  nickname
) => {
  await checkUser(userId, festivalId);
  const comment = await commentRepository.createComment(
    userId,
    boardId,
    content
  );
  const board = await boardRepository.getIdBoard(boardId);
  if (board.userId !== userId) {
    await notificationRepository.createCommentNotification(board, nickname);
    sendNotification(board.userId, {
      type: "comment",
      message: `${nickname}님이 댓글을 달았습니다.`,
      data: { commentId: comment.id },
      createdAt: new Date(),
    });
  }

  return comment;
};

const getComments = async (boardId, page, pageSize, orderBy) => {
  const comments = await commentRepository.getComments(
    boardId,
    page,
    pageSize,
    orderBy
  );
  return comments;
};

const updateComment = async (commentId, festivalId, userId, content) => {
  const comment = await commentRepository.getById(commentId);
  if (userId !== comment.userId) {
    throw new Error("댓글 수정 권한이 없습니다.");
  }
  await checkUser(userId, festivalId);
  return await commentRepository.updateComment(commentId, content);
};

const deleteComment = async (commentId, festivalId, userId, userRole) => {
  await checkUser(userId, festivalId);
  const comment = await commentRepository.getById(commentId);
  if (userId !== comment.userId && userRole !== "ADMIN") {
    throw new Error("댓글 삭제 권한이 없습니다.");
  }
  return await commentRepository.deleteComment(commentId);
};

export default { createComment, getComments, updateComment, deleteComment };
