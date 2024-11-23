import asyncHandle from "../middleware/error/asyncHandler.js";
import noticeService from "../services/noticeServices.js";

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

export default { getNotice: getNoticeController };
