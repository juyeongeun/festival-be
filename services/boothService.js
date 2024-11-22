import boothRepository from "../repositorys/boothRepository.js";

const createBooth = async (userId, festivalId, data) => {
  const booth = await boothRepository.createBooth(userId, festivalId, data);
  return booth;
};

export default { createBooth };
