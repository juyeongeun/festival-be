import prisma from "../utils/prismaClient.js";

const deleteNotice = (noticeId) => {
  const data = prisma.notice.delete({
    where: {
      id: noticeId,
    },
  });
  return data;
};
const patchNotice = (userId, noticeId, content) => {
  const data = prisma.notice.update({
    where: {
      id: noticeId,
    },
    data: {
      adminId: userId,
      content: content,
    },
  });
  return data;
};
const getNotice = (festivalId, page, pageSize, orderBy, order) => {
  const data = prisma.notice.findMany({
    where: {
      festivalId: festivalId,
    },
    orderBy: {
      [orderBy]: order,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  return data;
};

const createNotice = (userId, festivalId, content) => {
  const data = prisma.notice.create({
    data: {
      adminId: userId,
      festivalId: festivalId,
      content: content,
    },
  });
  return data;
};
export { getNotice, createNotice, patchNotice, deleteNotice };
