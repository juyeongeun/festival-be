import commentRepository from "../repositorys/commentRepository.js";
import participationRepository from "../repositorys/participationRepository.js";

const createComment = async (userId, festivalId, boardId, content) => {
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
  return comment;
};

export default { createComment };
