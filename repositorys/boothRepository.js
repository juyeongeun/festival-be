import prisma from "../utils/prismaClient.js";

const createBooth = (userId, festivalId, data) => {
  return prisma.booth.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      festival: {
        connect: {
          id: festivalId,
        },
      },
      ...data,
    },
  });
};

export default { createBooth };
