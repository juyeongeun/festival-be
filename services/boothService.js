import boothRepository from "../repositorys/boothRepository.js";
import checkUser from "../utils/checkUser.js";

const createBooth = async (userId, festivalId, data) => {
  const booth = await boothRepository.createBooth(userId, festivalId, data);
  return booth;
};

const getBoothAdmin = async (
  adminId,
  festivalId,
  page,
  pageSize,
  orderBy,
  keyword,
  type,
  userRole
) => {
  if (userRole !== "ADMIN") {
    throw new Error("ADMIN 권한만 조회할 수 있습니다.");
  }

  await checkUser(adminId, festivalId);

  return await boothRepository.getBoothAdmin(
    festivalId,
    page,
    pageSize,
    orderBy,
    keyword,
    type
  );
};

const getBooths = async (
  userId,
  festivalId,
  page,
  pageSize,
  orderBy,
  keyword,
  type
) => {
  await checkUser(userId, festivalId);
  return await boothRepository.getBooths(
    festivalId,
    page,
    pageSize,
    orderBy,
    keyword,
    type
  );
};

const getBooth = async (boothId, userId, festivalId) => {
  await checkUser(userId, festivalId);
  return await boothRepository.getBooth(boothId);
};

const updateBooth = async (festivalId, boothId, userId, userRole, data) => {
  if (userRole !== "ADMIN") {
    const boothUser = await boothRepository.getBooth(boothId);
    if (boothUser.length === 0) {
      throw new Error("수정할 부스가 없습니다.");
    }
    if (boothUser.userId !== userId) {
      throw new Error("본인의 부스만 수정할 수 있습니다.");
    }
  }
  await checkUser(userId, festivalId);

  return await boothRepository.updateBooth(boothId, data);
};

const getMyBooths = async (userId, festivalId) => {
  await checkUser(userId, festivalId);
  return await boothRepository.getMyBooths(userId, festivalId);
};

const deleteBooth = async (boothId, userId, festivalId, userRole) => {
  await checkUser(userId, festivalId);
  const booth = await boothRepository.getBooth(parseInt(boothId));
  if (booth.userId !== userId && userRole !== "ADMIN") {
    throw new Error("삭제 권한이 없습니다.");
  }
  return await boothRepository.deleteBooth(boothId);
};

const getBoothName = async (festivalId) => {
  const booths = await boothRepository.getBoothName(festivalId);
  if (booths.length === 0) {
    throw new Error("부스가 없습니다.");
  }
  return { booths };
};

export default {
  createBooth,
  getBoothAdmin,
  getBooths,
  getBooth,
  updateBooth,
  getMyBooths,
  deleteBooth,
  getBoothName,
};
