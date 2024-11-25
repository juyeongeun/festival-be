import prisma from "../utils/prismaClient.js";

const getIdNotification = (userId, notificationId) => {
  const data = prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId: userId,
    },
  });
  return data;
};
const getNotification = (userId) => {
  const data = prisma.notification.findMany({
    where: {
      userId: userId,
    },
  });
  return data;
};
const patchNotification = (userId, notificationId) => {
  const data = prisma.notification.update({
    where: {
      id: notificationId,
      userId: userId,
    },
    data: {
      read: true,
    },
  });
  return data;
};

const createNoticeNotification = (userId, content) => {
  const data = prisma.notification.create({
    data: {
      userId: userId,
      content: content,
    },
  });
  return data;
};

const createCommentNotification = (board, nickname) => {
  const data = prisma.notification.create({
    data: {
      userId: board.userId,
      content: `${board.title}에 ${nickname}댓글이 작성되었습니다.`,
    },
  });
  return data;
};

const createPayNotification = (userId, waitingTime) => {
  const data = prisma.notification.create({
    data: {
      userId: userId,
      content: waitingTime,
    },
  });
  return data;
};

export default {
  createNoticeNotification,
  createCommentNotification,
  createPayNotification,
  patchNotification,
  getNotification,
  getIdNotification,
};
