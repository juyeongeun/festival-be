import userRepository from "../repositorys/userRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const filterSensitiveUserData = (user) => {
  //리스폰스의 민감한 정보를 빼고 보낸다
  const { password, refreshToken, provider, providerId, ...rest } = user;
  return rest;
};

const verifyPassword = async (inputPassword, savedPassword) => {
  const isValid = await bcrypt.compare(inputPassword, savedPassword);
  if (!isValid) {
    const error = new Error("Unauthorized");
    error.status = 401;
    error.data = {
      message: "비밀번호가 일치 하지 않습니다.",
    };
    throw error;
  }
};

const getProviderMe = async ({ provider, providerId }) => {
  const user = await userRepository.getUserByProvider({ provider, providerId });
  if (!user) return null;
  return filterSensitiveUserData(user);
};

const getNormalMe = async ({ userName, password }) => {
  const user = await userRepository.getUserByUserName(userName);
  if (!user) return null;

  await verifyPassword(password, user.password);
  return filterSensitiveUserData(user);
};

const createToken = (user, type) => {
  const payload = { userId: user.id, userName: user.userName }; //jwt 토근 정도에 사용자의 id, userName 정보를 담는다.
  const options = { expiresIn: type ? "1w" : "1h" }; //refresh 토큰의 경우 1주일, access 토근은 1시간의 유효성을 둔다
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const updateUser = async (id, data) => {
  const user = await userRepository.updateUser(id, data);
  return filterSensitiveUserData(user);
};

const createProviderUser = async (data) => {
  const newUser = await userRepository.createProviderUser({
    role: "USER",
    ...data,
  });
  return filterSensitiveUserData(newUser);
};

const createNormalUser = async (data) => {
  const userByUserName = await userRepository.getUserByUserName(data.userName);
  if (userByUserName) {
    return;
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.$transaction(async (prisma) => {
    const createdUser = await prisma.user.create({
      data: {
        userName: data.userName,
        role: "ADMIN",
        password: hashedPassword,
      },
    });

    await prisma.participation.create({
      data: {
        user: {
          connect: {
            id: createdUser.id,
          },
        },
        festival: {
          connect: {
            id: data.festivalId,
          },
        },
      },
    });

    return createdUser;
  });

  return filterSensitiveUserData(newUser);
};

const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  return filterSensitiveUserData(user);
};

const comparePassword = async (id, currentPassword, newPassword) => {
  const user = await userRepository.getUserById(id);
  await verifyPassword(currentPassword, user.password);
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return hashedPassword;
};

const refreshToken = async (userId, refreshToken) => {
  const user = await userRepository.getUserById(userId);

  if (!user) {
    const error = new Error("Not found");
    error.status = 404;
    error.data = {
      message: "등록된 사용자가 없습니다.",
    };
    throw error;
  }

  if (refreshToken !== user.refreshToken) {
    const error = new Error("Forbidden");
    error.status = 403;
    error.data = {
      message: "리프레쉬 토큰이 유효하지 않습니다.",
    };
    throw error;
  }
  return true;
};

const generateRandomString = () => {
  return uuidv4(); // 유니크한 UUID 문자열 반환
};

const deleteUser = async (userId) => {
  const userName = generateRandomString(10);
  await userRepository.deleteUser(userId, userName);
  return true;
};

const updateUserBooth = async (role, boothId, type, location, userRole) => {
  if (userRole !== "ADMIN") {
    throw new Error("ADMIN만 변경할 수 있습니다.");
  }
  const data = await userRepository.updateUserBooth(
    role,
    boothId,
    type,
    location
  );
  return data;
};

export default {
  getNormalMe,
  getProviderMe,
  createNormalUser,
  createToken,
  updateUser,
  createProviderUser,
  getUserById,
  comparePassword,
  refreshToken,
  deleteUser,
  updateUserBooth,
};
