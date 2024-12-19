import prisma from "../utils/prismaClient.js";

const createPay = (data) => {
  return prisma.pay.create({
    data,
  });
};

const getPaysByUserId = (userId) => {
  return prisma.pay.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      price: true,
      payType: true,
      waitingNumber: true,
      createdAt: true,
      boothId: true,
      wishList: {
        take: 1,
        select: {
          booth: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          wishList: true,
        },
      },
    },
  });
};

const getPay = (payId) => {
  return prisma.pay.findUnique({
    where: {
      id: payId,
    },
    select: {
      id: true,
      price: true,
      payType: true,
      waitingNumber: true,
      createdAt: true,
      boothId: true,
      wishList: {
        select: {
          id: true,
          cnt: true,
          price: true,
          booth: {
            select: {
              id: true,
              name: true,
            },
          },
          menu: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });
};

const getPayByBoothId = async (boothId, page, pageSize, startDate, endDate) => {
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
      user: {
        select: {
          nickname: true,
        },
      },
      wishList: {
        select: {
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

export default { createPay, getPaysByUserId, getPay, getPayByBoothId };
