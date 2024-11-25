import participationRepository from "../repositorys/participationRepository.js";
import notificationRepository from "../repositorys/notificationRepository.js";
import boardRepository from "../repositorys/boardRepository.js";

const getIdNotification = async (userId, notificationId) => {
  const data = await notificationRepository.getIdNotification(
    userId,
    notificationId
  );
  if (!data) {
    throw new Error("알림이 존재하지 않습니다.");
  }
  return data;
};
const getNotification = async (userId) => {
  const data = await notificationRepository.getNotification(userId);
  return data;
};
const patchNotification = async (userId, notificationId) => {
  const data = await notificationRepository.patchNotification(
    userId,
    notificationId
  );
  if (!data) {
    throw new Error("알림이 존재하지 않습니다.");
  }
  return data;
};

export default {
  patchNotification,
  getNotification,
  getIdNotification,
};
