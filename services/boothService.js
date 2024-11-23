import boothRepository from "../repositorys/boothRepository.js";

const createBooth = async (userId, festivalId, data) => {
  const booth = await boothRepository.createBooth(userId, festivalId, data);
  return booth;
};

const getBoothAdmin = async (
  festivalId,
  userRole,
  page,
  pageSize,
  orderBy,
  keyword,
  type
) => {
  if (userRole !== "ADMIN") {
    return res.status(403).send("ADMIN 권한만 조회할 수 있습니다.");
  }
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

export default { createBooth, getBoothAdmin, getBooths };
