import * as noticeRepository from "../repositorys/noticeRepositorys.js";
import participationRepository from "../repositorys/participationRepositorys.js";
const getNotice = async (
  userId,
  festivalId,
  page,
  pageSize,
  orderBy,
  order
) => {
  const festivalUser = await participationRepository.participationCheck(
    userId,
    festivalId
  );

  if (!festivalUser) {
    throw new Error("참여자가 아닙니다.");
  }
  const data = await noticeRepository.getNotice(
    festivalId,
    page,
    pageSize,
    orderBy,
    order
  );
  return data;
};

export default { getNotice };
