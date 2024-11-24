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

const getById = (commentId) => {
  return prisma.comment.findUnique({
    where: {
      id: commentId,
    },
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

const updateComment = (commentId, content) => {
  return prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: content,
    },
  });
};
export default { createComment, getComments, getById, updateComment };
