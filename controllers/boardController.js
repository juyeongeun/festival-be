import asyncHandle from "../middleware/error/asyncHandler.js";
import boardService from "../services/boardService.js";
// 컨트롤러 파람스
// 서비스 유효성
// 레포지토리 디비

const adminGetBoardController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId, role: userRole } = req.user;
    const { festivalId } = req.params;
    const {
      page = 1,
      pageSize = 5,
      orderBy = "recent",
      keyword = "",
      boardType = "",
      startDate = "",
      endDate = "",
    } = req.query;
    const data = await boardService.adminGetBoard(
      parseInt(festivalId, 10),
      parseInt(userId, 10),
      parseInt(page, 10) || 1,
      parseInt(pageSize, 10) || 4,
      orderBy,
      keyword,
      boardType,
      userRole,
      startDate,
      endDate
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
const deleteBoardController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { festivalId, boardId } = req.params;
    const data = await boardService.deleteBoard(
      parseInt(userId),
      parseInt(festivalId),
      parseInt(boardId)
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const patchBoardController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { festivalId, boardId } = req.params;
    const { title, content, boardType, lossType } = req.body;
    const images = req.files.map((file) => file.location);

    const data = await boardService.patchBoard(
      parseInt(userId),
      parseInt(festivalId),
      parseInt(boardId),
      title,
      content,
      images,
      boardType,
      lossType
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const getIdBoardController = asyncHandle(async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const data = await boardService.getIdBoard(parseInt(boardId));
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const getLossBoardController = asyncHandle(async (req, res, next) => {
  try {
    const { festivalId } = req.params;
    const {
      page = 1,
      pageSize = 5,
      orderBy = "recent",
      typeSelect = "",
      keyword = "",
    } = req.query;
    const data = await boardService.getLossBoard(
      parseInt(festivalId),
      parseInt(page),
      parseInt(pageSize),
      orderBy,
      typeSelect,
      keyword
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const getBoardController = asyncHandle(async (req, res, next) => {
  try {
    const { festivalId } = req.params;
    const { page = 1, pageSize = 5, orderBy = "recent" } = req.query;
    const data = await boardService.getBoard(
      parseInt(festivalId),
      parseInt(page),
      parseInt(pageSize),
      orderBy
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
const createBoardController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { festivalId } = req.params;
    const { title, content, boardType, lossType } = req.body;
    const images = req.files.map((file) => file.location);

    const data = await boardService.createBoard(
      parseInt(userId),
      parseInt(festivalId),
      title,
      content,
      images || [],
      boardType,
      lossType || "NULL"
    );

    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

export default {
  createBoard: createBoardController,
  getBoard: getBoardController,
  getIdBoard: getIdBoardController,
  getLossBoard: getLossBoardController,
  patchBoard: patchBoardController,
  deleteBoard: deleteBoardController,
  adminGetBoard: adminGetBoardController,
};
