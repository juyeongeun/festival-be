import prisma from "../utils/prismaClient.js";

const getUserByProvider = (data) => {
  return prisma.user.findFirst({
    where: {
      provider: data.provider,
      providerId: data.providerId,
    },
  });
};

const getUserByUserName = (userName) => {
  return prisma.user.findFirst({
    where: {
      userName: userName,
    },
  });
};

const updateUser = (id, data) => {
  return prisma.user.update({
    where: {
      id: id,
    },
    data,
  });
};

const createProviderUser = (data) => {
  return prisma.user.create({ data });
};

const createNormalUser = (data) => {
  return prisma.user.create({ data });
};

const getUserById = (id) => {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
  });
};

export default {
  getUserByProvider,
  getUserByUserName,
  updateUser,
  createProviderUser,
  createNormalUser,
  getUserById,
};
