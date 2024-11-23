import prisma from "../utils/prismaClient.js";

const adminGetBoard = async (
  festivalId,
  page,
  pageSize,
  orderBy,
  order,
  keyword,
  boardType
) => {
  const data = await prisma.board.findMany({
    where: {
      festivalId: festivalId,
      boardType: boardType,
      title: {
        contains: keyword,
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      [orderBy]: order,
    },
  });
  return data;
};
const deleteBoard = async (boardId) => {
  const data = await prisma.board.delete({
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
  const data = await prisma.board.update({
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
  const data = await prisma.board.findUnique({
    where: {
      id: boardId,
    },
  });
  return data;
};

const getLossBoard = async (festivalId, page, pageSize, orderBy, order) => {
  const data = await prisma.board.findMany({
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
  const data = await prisma.board.findMany({
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
  const data = await prisma.board.create({
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

export {
  createBoard,
  getBoard,
  getIdBoard,
  getLossBoard,
  patchBoard,
  deleteBoard,
  adminGetBoard,
};
