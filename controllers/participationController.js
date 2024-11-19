import participationService from "../services/participationService.js"; // 이름 충돌 방지
import asyncHandle from "../middleware/error/asyncHandler.js";

const createParticipationController = asyncHandle(async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { festivalId } = req.params;
    const participation = await participationService.createParticipation(
      parseInt(userId),
      parseInt(festivalId)
    );
    res
      .status(201)
      .send({ message: "Participation created successfully", participation });
  } catch (error) {
    next(error);
  }
});

export default { createParticipation: createParticipationController };
