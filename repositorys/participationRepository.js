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

const participationCheck = (userId, festivalId) => {
  const data = prisma.participation.findFirst({
    where: {
      festivalId: festivalId,
      userId: userId,
    },
  });
  return data;
};

const participationManyCheck = (festivalId) => {
  const data = prisma.participation.findMany({
    where: {
      festivalId: festivalId,
    },
    select: {
      userId: true,
    },
  });
  return data;
};

export default {
  createParticipation,
  participationCheck,
  participationManyCheck,
};
