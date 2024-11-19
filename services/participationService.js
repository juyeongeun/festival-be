import participationRepository from "../repositorys/participationRepositoy.js";

const createParticipation = async (userId, festivalId) => {
  const participation = await participationRepository.createParticipation(
    userId,
    festivalId
  );
  return participation;
};

export default { createParticipation };
