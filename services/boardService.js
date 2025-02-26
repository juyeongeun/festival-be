import boardRepository from "../repositorys/boardRepository.js";
import checkUser from "../utils/checkUser.js";
import userRepository from "../repositorys/userRepository.js";

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
  const user = await userRepository.getUserById(data.userId);
  data.userName = user.userName;
  data.nickname = user.nickname;
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

  const boardsWithUserInfo = await Promise.all(
    data.map(async (board) => {
      const user = await userRepository.getUserById(board.userId);
      return {
        ...board,
        userName: user.userName,
        nickname: user.nickname,
      };
    })
  );
  return boardsWithUserInfo;
};

const getLossBoard = async (
  festivalId,
  page,
  pageSize,
  orderBy,
  typeSelect,
  keyword
) => {
  const data = await boardRepository.getLossBoard(
    festivalId,
    page,
    pageSize,
    orderBy,
    typeSelect,
    keyword
  );
  const boardsWithUserInfo = await Promise.all(
    data.map(async (board) => {
      const user = await userRepository.getUserById(board.userId);
      return {
        ...board,
        userName: user.userName,
        nickname: user.nickname,
      };
    })
  );
  return boardsWithUserInfo;
};

const getBoard = async (festivalId, page, pageSize, orderBy) => {
  const data = await boardRepository.getBoard(
    festivalId,
    page,
    pageSize,
    orderBy
  );
  const boardsWithUserInfo = await Promise.all(
    data.map(async (board) => {
      const user = await userRepository.getUserById(board.userId);
      return {
        ...board,
        userName: user.userName,
        nickname: user.nickname,
      };
    })
  );

  return boardsWithUserInfo;
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
