import prisma from "../utils/prismaClient.js";

const getPayData = async (
  userId,
  boothId,
  page,
  pageSize,
  startDate,
  endDate
) => {
  const whereCondition = {
    boothId: boothId,
  };
  if (startDate) {
    const startDateTime = new Date(startDate);
    startDateTime.setUTCHours(0 - 9, 0, 0, 0);
    whereCondition.createdAt = {
      ...whereCondition.createdAt,
      gte: startDateTime,
    };
  }
  if (endDate) {
    const endDateTime = new Date(endDate);
    endDateTime.setUTCHours(23 - 9, 59, 59, 999);
    whereCondition.createdAt = {
      ...whereCondition.createdAt,
      lte: endDateTime,
    };
  }

  const pay = await prisma.pay.findMany({
    where: whereCondition,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      userId: true,
      createdAt: true,
      price: true,
    },
    include: {
      user: {
        select: {
          nickname: true,
        },
      },
      wishlist: {
        include: {
          menu: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });
  return pay;
};

export default { getPayData };
