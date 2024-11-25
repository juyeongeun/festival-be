import * as noticeRepository from "../repositorys/noticeRepository.js";
import participationRepository from "../repositorys/participationRepository.js";
import notificationRepository from "../repositorys/notificationRepository.js";
const deleteNotice = async (userId, festivalId, noticeId, userRole) => {
  if (userRole !== "ADMIN") {
    throw new Error("관리자가 아닙니다.");
  }
  const festivalUser = await participationRepository.participationCheck(
    userId,
    festivalId
  );
  if (!festivalUser) {
    throw new Error("참여자가 아닙니다.");
  }
  const data = await noticeRepository.deleteNotice(noticeId);
  return data;
};
const getNotice = async (userId, festivalId, page, pageSize, orderBy) => {
  const festivalUser = await participationRepository.participationCheck(
    userId,
    festivalId
  );

  if (!festivalUser) {
    throw new Error("참여자가 아닙니다.");
  }
  const data = await noticeRepository.getNotice(
    festivalId,
    page,
    pageSize,
    orderBy
  );
  return data;
};

const patchNotice = async (userId, festivalId, noticeId, userRole, content) => {
  if (userRole !== "ADMIN") {
    throw new Error("관리자가 아닙니다.");
  }
  const festivalUser = await participationRepository.participationCheck(
    userId,
    festivalId
  );
  if (!festivalUser) {
    throw new Error("참여자가 아닙니다.");
  }
  const data = await noticeRepository.patchNotice(userId, noticeId, content);
  return data;
};

const createNotice = async (userId, festivalId, userRole, content) => {
  if (userRole !== "ADMIN") {
    throw new Error("관리자가 아닙니다.");
  }
  const festivalUser = await participationRepository.participationCheck(
    userId,
    festivalId
  );

  if (!festivalUser) {
    throw new Error("참여자가 아닙니다.");
  }

  const data = await noticeRepository.createNotice(userId, festivalId, content);

  const userList = await participationRepository.participationManyCheck(
    festivalId
  );

  await Promise.all(
    userList.map(async (user) => {
      await notificationRepository.createNoticeNotification(
        user.userId,
        content
      );
    })
  );
  return data;
};

export default { getNotice, createNotice, patchNotice, deleteNotice };
