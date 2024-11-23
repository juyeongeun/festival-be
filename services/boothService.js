import boothRepository from "../repositorys/boothRepository.js";

const createBooth = async (userId, festivalId, data) => {
  const booth = await boothRepository.createBooth(userId, festivalId, data);
  return booth;
};

const getBoothAdmin = async (
  festivalId,
  page,
  pageSize,
  orderBy,
  keyword,
  type
) => {
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
  festivalId,
  page,
  pageSize,
  orderBy,
  keyword,
  type
) => {
  return await boothRepository.getBooths(
    festivalId,
    page,
    pageSize,
    orderBy,
    keyword,
    type
  );
};

const getBooth = async (boothId) => {
  return await boothRepository.getBooth(boothId);
};

const updateBooth = async (boothId, userId, data) => {
  const boothUser = await boothRepository.getMyBooths(userId);

  if (boothUser[0].userId !== userId) {
    throw new Error("해당 부스 소유자만 수정할 수 있습니다.");
  }
  return await boothRepository.updateBooth(boothId, data);
};

const getMyBooths = async (userId, festivalId) => {
  return await boothRepository.getMyBooths(userId, festivalId);
};

const deleteBooth = async (boothId) => {
  return await boothRepository.deleteBooth(boothId);
};

export default {
  createBooth,
  getBoothAdmin,
  getBooths,
  getBooth,
  updateBooth,
  getMyBooths,
  deleteBooth,
};
