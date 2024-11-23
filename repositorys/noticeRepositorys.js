import prisma from "../utils/prismaClient.js";

const getNotice = async (festivalId, page, pageSize, orderBy, order) => {
  const data = await prisma.notice.findMany({
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

const createNotice = async (userId, festivalId, content) => {
  const data = await prisma.notice.create({
    data: {
      adminId: userId,
      festivalId: festivalId,
      content: content,
    },
  });
  return data;
};
export { getNotice, createNotice };
