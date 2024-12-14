import prisma from "../utils/prismaClient.js";

const createPay = (data) => {
  return prisma.pay.create({
    data,
  });
};

export default { createPay };
