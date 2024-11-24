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

const getComments = (boardId, page, pageSize, orderBy) => {
  const skip = (page - 1) * pageSize;
  const where = {
    boardId: boardId,
  };
  const validOrders = ["recent", "older"];
  if (!validOrders.includes(orderBy)) {
    orderBy = "recent";
  }
  return prisma.comment.findMany({
    where,
    skip,
    take: pageSize,
    orderBy: { createdAt: orderBy == "recent" ? "desc" : "asc" },
    include: {
      user: {
        select: {
          id: true,
          userName: true,
        },
      },
    },
  });
};
export default { createComment, getComments };
