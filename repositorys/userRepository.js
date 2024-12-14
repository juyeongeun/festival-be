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

const deleteUser = (userId, userName) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      userName: userName,
      nickname: "탈퇴한 회원",
      password: null,
      role: "USER",
      refreshToken: null,
      provider: null,
      providerId: null,
    },
  });
};

const updateUserBooth = async (role, boothId, type, location) => {
  const booth = await prisma.booth.findFirst({
    where: { id: boothId },
  });

  if (!booth) {
    throw new Error("부스를 찾을 수 없습니다.");
  }

  await prisma.$transaction(async (pr) => {
    await pr.user.update({
      where: { id: booth.userId },
      data: { role: role },
    }),
      await pr.booth.update({
        where: { id: boothId },
        data: { accept: type, location: location },
      });
  });
};

export default {
  getUserByProvider,
  getUserByUserName,
  updateUser,
  createProviderUser,
  createNormalUser,
  getUserById,
  deleteUser,
  updateUserBooth,
};
