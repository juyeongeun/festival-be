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

export default { createPay, getPaysByUserId, getPay };
