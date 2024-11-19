import prisma from "../utils/prismaClient.js";

const createParticipation = (userId, festivalId) => {
  return prisma.participation.create({
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
    },
  });
};

export default { createParticipation };
