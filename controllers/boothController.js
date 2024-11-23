import boothService from "../services/boothService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";
import participationRepository from "../repositorys/participationRepository.js";

const createBooth = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { festivalId } = req.params;
    const {
      name,
      content,
      image,
      boothType,
      typeCategory,
      accountNumber,
      bankName,
    } = req.body;
    const booth = await boothService.createBooth(
      parseInt(userId),
      parseInt(festivalId),
      {
        name,
        content,
        image,
        boothType,
        typeCategory,
        accountNumber,
        bankName,
      }
    );
    res.status(201).send(booth);
  } catch (error) {
    next(error);
  }
});

const getBoothAdmin = asyncHandle(async (req, res, next) => {
  try {
    const { role: userRole } = req.user;
    const { festivalId } = req.params;
    const {
      page = 1,
      pageSize = 5,
      orderBy = "recent",
      keyword = "",
      type = "",
    } = req.query;

    const booths = await boothService.getBoothAdmin(
      userRole,
      parseInt(festivalId),
      parseInt(page),
      parseInt(pageSize),
      orderBy,
      keyword,
      type
    );

    res.status(200).send(booths);
  } catch (error) {
    next(error);
  }
});

const getBooths = asyncHandle(async (req, res, next) => {
  try {
    const { festivalId } = req.params;
    const { id: userId } = req.user;

    const isParticipated = await participationRepository.participationCheck(
      parseInt(userId),
      parseInt(festivalId)
    );
    if (!isParticipated) {
      return res.status(403).send("참여중인 축제가 아닙니다.");
    }

    const {
      page = 1,
      pageSize = 5,
      orderBy = "recent",
      keyword = "",
      type = "",
    } = req.query;

    const booths = await boothService.getBooths(
      parseInt(festivalId),
      parseInt(page),
      parseInt(pageSize),
      orderBy,
      keyword,
      type
    );

    res.status(200).send(booths);
  } catch (error) {
    next(error);
  }
});

export default { createBooth, getBoothAdmin, getBooths };
