import participationRepository from "../repositorys/participationRepository.js";

const createParticipation = async (userId, festivalId) => {
  const participation = await participationRepository.createParticipation(
    userId,
    festivalId
  );
  return participation;
};

export default { createParticipation };
