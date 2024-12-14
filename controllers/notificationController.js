import asyncHandle from "../middleware/error/asyncHandler.js";
import notificationService from "../services/notificationService.js";

const getIdNotificationController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { notificationId } = req.params;
    const data = await notificationService.getIdNotification(
      parseInt(userId),
      parseInt(notificationId)
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
const getNotificationController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const data = await notificationService.getNotification(parseInt(userId));
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
const patchNotificationController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { notificationId } = req.params;
    const data = await notificationService.patchNotification(
      parseInt(userId),
      parseInt(notificationId)
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default {
  patchNotification: patchNotificationController,
  getNotification: getNotificationController,
  getIdNotification: getIdNotificationController,
};
