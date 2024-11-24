import prisma from "../utils/prismaClient.js";

const createComment = (userId, boardId, content) => {
  return prisma.comment.create({
    data: {
      board: {
        connect: {
          id: boardId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      content: content,
    },
  });
};

export default { createComment };
