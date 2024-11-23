import boothRepository from "../repositorys/boothRepository.js";
import participationRepository from "../repositorys/participationRepository.js";

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
  userId,
  page,
  pageSize,
  orderBy,
  keyword,
  type
) => {
  const isParticipated = await participationRepository.participationCheck(
    userId,
    festivalId
  );
  if (!isParticipated) {
    return res.status(403).send("참여중인 축제가 아닙니다.");
  }

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
