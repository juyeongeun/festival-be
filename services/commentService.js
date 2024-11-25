import commentRepository from "../repositorys/commentRepository.js";
import participationRepository from "../repositorys/participationRepository.js";
import notificationRepository from "../repositorys/notificationRepository.js";
import boardRepository from "../repositorys/boardRepository.js";
const createComment = async (
  userId,
  festivalId,
  boardId,
  content,
  nickname
) => {
  const isParticipated = await participationRepository.participationCheck(
    userId,
    festivalId
  );
  if (!isParticipated) {
    throw new Error("참여중인 축제가 아닙니다.");
  }
  const comment = await commentRepository.createComment(
    userId,
    boardId,
    content
  );
  const board = await boardRepository.getIdBoard(boardId);
  if (board.userId !== userId) {
    await notificationRepository.createCommentNotification(board, nickname);
  }

  return comment;
};

const getComments = async (
  festivalId,
  boardId,
  userId,
  page,
  pageSize,
  orderBy
) => {
  const isParticipated = await participationRepository.participationCheck(
    userId,
    festivalId
  );
  if (!isParticipated) {
    throw new Error("참여중인 축제가 아닙니다.");
  }
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
  const isParticipated = await participationRepository.participationCheck(
    userId,
    festivalId
  );
  if (!isParticipated) {
    throw new Error("참여중인 축제가 아닙니다.");
  }
  return await commentRepository.updateComment(commentId, content);
};

const deleteComment = async (commentId, festivalId, userId, userRole) => {
  const isParticipated = await participationRepository.participationCheck(
    userId,
    festivalId
  );
  if (!isParticipated) {
    throw new Error("참여중인 축제가 아닙니다.");
  }
  const comment = await commentRepository.getById(commentId);
  if (userId !== comment.userId && userRole !== "ADMIN") {
    throw new Error("댓글 삭제 권한이 없습니다.");
  }
  return await commentRepository.deleteComment(commentId);
};

export default { createComment, getComments, updateComment, deleteComment };
