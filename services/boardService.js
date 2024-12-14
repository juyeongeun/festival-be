import boardRepository from "../repositorys/boardRepository.js";
import checkUser from "../utils/checkUser.js";

const deleteBoard = async (userId, festivalId, boardId) => {
  await checkUser(userId, festivalId);
  const board = await boardRepository.getIdBoard(boardId);
  if (board.userId !== userId) {
    throw new Error("게시글의 작성자가 아닙니다.");
  }

  const data = await boardRepository.deleteBoard(boardId);
  return data;
};
const patchBoard = async (
  userId,
  festivalId,
  boardId,
  title,
  content,
  images,
  boardType,
  lossType
) => {
  await checkUser(userId, festivalId);
  const board = await boardRepository.getIdBoard(boardId);
  if (board.userId !== userId) {
    throw new Error("게시글의 작성자가 아닙니다.");
  }

  const data = await boardRepository.patchBoard(
    boardId,
    title,
    content,
    images,
    boardType,
    lossType
  );
  return data;
};
const getIdBoard = async (boardId) => {
  const data = await boardRepository.getIdBoard(boardId);
  return data;
};

const adminGetBoard = async (
  festivalId,
  userId,
  page,
  pageSize,
  orderBy,
  keyword,
  boardType,
  userRole,
  startDate,
  endDate
) => {
  if (userRole !== "ADMIN") {
    throw new Error("관리자가 아닙니다.");
  }

  await checkUser(userId, festivalId);

  const data = await boardRepository.adminGetBoard(
    festivalId,
    page,
    pageSize,
    orderBy,
    keyword,
    boardType,
    startDate,
    endDate
  );
  return data;
};

const getLossBoard = async (festivalId, page, pageSize, orderBy) => {
  const data = await boardRepository.getLossBoard(
    festivalId,
    page,
    pageSize,
    orderBy
  );
  return data;
};

const getBoard = async (festivalId, page, pageSize, orderBy) => {
  const data = await boardRepository.getBoard(
    festivalId,
    page,
    pageSize,
    orderBy
  );
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
  await checkUser(userId, festivalId);
  const data = await boardRepository.createBoard(
    userId,
    festivalId,
    title,
    content,
    images,
    boardType,
    lossType
  );
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
