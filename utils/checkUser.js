import participationRepository from "../repositorys/participationRepository.js";

const checkUser = async (userId, festivalId) => {
  const isParticipated = await participationRepository.participationCheck(
    userId,
    festivalId
  );
  if (!isParticipated) {
    throw new Error("참여중인 축제가 아닙니다.");
  }
};

export default checkUser;
