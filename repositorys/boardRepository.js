import prisma from "../utils/prismaClient.js";

const adminGetBoard = (
  festivalId,
  page,
  pageSize,
  orderBy,
  keyword,
  boardType,
  startDate,
  endDate
) => {
  const whereCondition = {
    festivalId: festivalId,
    boardType: boardType,
    OR: [
      {
        title: {
          contains: keyword,
        },
      },
      {
        content: {
          contains: keyword,
        },
      },
      {
        user: {
          userName: {
            contains: keyword,
          },
        },
      },
      {
        user: {
          nickname: {
            contains: keyword,
          },
        },
      },
    ],
  };

  if (startDate) {
    const startDateTime = new Date(startDate);
    startDateTime.setUTCHours(0 - 9, 0, 0, 0);
    whereCondition.createdAt = {
      ...whereCondition.createdAt,
      gte: startDateTime,
    };
  }
  if (endDate) {
    const endDateTime = new Date(endDate);
    endDateTime.setUTCHours(23 - 9, 59, 59, 999);
    whereCondition.createdAt = {
      ...whereCondition.createdAt,
      lte: endDateTime,
    };
  }

  const data = prisma.board.findMany({
    where: whereCondition,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: orderBy === "recent" ? "desc" : "asc",
    },
  });
  return data;
};
const deleteBoard = (boardId) => {
  const data = prisma.board.delete({
    where: {
      id: boardId,
    },
  });
  return data;
};
const patchBoard = (boardId, title, content, images, boardType, lossType) => {
  const data = prisma.board.update({
    where: {
      id: boardId,
    },
    data: {
      title: title,
      content: content,
      images: images,
      boardType: boardType,
      lossType: lossType,
    },
  });
  return data;
};
const getIdBoard = (boardId) => {
  const data = prisma.board.findUnique({
    where: {
      id: boardId,
    },
  });
  return data;
};

const getLossBoard = (
  festivalId,
  page,
  pageSize,
  orderBy,
  typeSelect,
  keyword
) => {
  const whereCondition = {
    festivalId: festivalId,
    boardType: "LOSS",
    lossType: typeSelect || undefined,
    OR: [
      {
        title: {
          contains: keyword,
        },
      },
      {
        content: {
          contains: keyword,
        },
      },
    ],
  };

  const data = prisma.board.findMany({
    where: whereCondition,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: orderBy === "recent" ? "desc" : "asc",
    },
  });
  return data;
};
const getBoard = (festivalId, page, pageSize, orderBy) => {
  const data = prisma.board.findMany({
    where: {
      festivalId: festivalId,
      boardType: "BOARD",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: orderBy === "recent" ? "desc" : "asc",
    },
  });
  return data;
};

const createBoard = (
  userId,
  festivalId,
  title,
  content,
  images,
  boardType,
  lossType
) => {
  const data = prisma.board.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      festival: {
        connect: {
          id: festivalId,
        },
      },
      title: title,
      content: content,
      images: images,
      boardType: boardType,
      lossType: lossType,
    },
  });
  return data;
};

export default {
  createBoard,
  getBoard,
  getIdBoard,
  getLossBoard,
  patchBoard,
  deleteBoard,
  adminGetBoard,
};
