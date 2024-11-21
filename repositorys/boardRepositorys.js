import Prisma from "../utils/prismaClient.js";

const deleteBoard = async (boardId) => {
  const data = await Prisma.board.delete({
    where: {
      id: boardId,
    },
  });
  return data;
};
const patchBoard = async (
  boardId,
  title,
  content,
  images,
  boardType,
  lossType
) => {
  const data = await Prisma.board.update({
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
const getIdBoard = async (boardId) => {
  const data = await Prisma.board.findUnique({
    where: {
      id: boardId,
    },
  });
  return data;
};

const getLossBoard = async (festivalId, page, pageSize, orderBy, order) => {
  const data = await Prisma.board.findMany({
    where: {
      festivalId: festivalId,
      boardType: "LOSS",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      [orderBy]: order,
    },
  });
  return data;
};
const getBoard = async (festivalId, page, pageSize, orderBy, order) => {
  const data = await Prisma.board.findMany({
    where: {
      festivalId: festivalId,
      boardType: "BOARD",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      [orderBy]: order,
    },
  });
  return data;
};

const createBoard = async (
  userId,
  festivalId,
  title,
  content,
  images,
  boardType,
  lossType
) => {
  const data = await Prisma.board.create({
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
const participationCheck = async (userId, festivalId) => {
  const data = await Prisma.participation.findFirst({
    where: {
      festivalId: festivalId,
      userId: userId,
    },
  });
  return data;
};

export {
  createBoard,
  participationCheck,
  getBoard,
  getIdBoard,
  getLossBoard,
  patchBoard,
  deleteBoard,
};
