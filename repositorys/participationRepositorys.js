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

const participationCheck = async (userId, festivalId) => {
  const data = await prisma.participation.findFirst({
    where: {
      festivalId: festivalId,
      userId: userId,
    },
  });
  return data;
};

export default { createParticipation, participationCheck };
