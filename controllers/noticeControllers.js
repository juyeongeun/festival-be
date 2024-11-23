import asyncHandle from "../middleware/error/asyncHandler.js";
import noticeService from "../services/noticeServices.js";

const deleteNoticeController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId, role: userRole } = req.user;
    const { festivalId, noticeId } = req.params;
    const data = await noticeService.deleteNotice(
      parseInt(userId),
      parseInt(festivalId),
      parseInt(noticeId),
      userRole
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
const getNoticeController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { festivalId } = req.params;
    const { page, pageSize, orderBy, order } = req.query;
    const data = await noticeService.getNotice(
      parseInt(userId),
      parseInt(festivalId),
      page || 1,
      pageSize || 4,
      orderBy || "createdAt",
      order || "asc"
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const createNoticeController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId, role: userRole } = req.user;
    const { festivalId } = req.params;
    const { content } = req.body;
    const data = await noticeService.createNotice(
      parseInt(userId),
      parseInt(festivalId),
      userRole,
      content
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const patchNoticeController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId, role: userRole } = req.user;
    const { festivalId, noticeId } = req.params;
    const { content } = req.body;
    const data = await noticeService.patchNotice(
      parseInt(userId),
      parseInt(festivalId),
      parseInt(noticeId),
      userRole,
      content
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default {
  getNotice: getNoticeController,
  createNotice: createNoticeController,
  patchNotice: patchNoticeController,
  deleteNotice: deleteNoticeController,
};
