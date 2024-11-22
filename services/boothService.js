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

export default { createBooth, getBoothAdmin };
