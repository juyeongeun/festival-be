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
    const { id: adminId, role: userRole } = req.user;
    const { festivalId } = req.params;

    const isParticipated = await participationRepository.participationCheck(
      parseInt(adminId),
      parseInt(festivalId)
    );
    if (!isParticipated) {
      return res.status(403).send("참여중인 축제가 아닙니다.");
    }

    if (userRole !== "ADMIN") {
      return res.status(403).send("ADMIN 권한만 조회할 수 있습니다.");
    }
    const {
      page = 1,
      pageSize = 5,
      orderBy = "recent",
      keyword = "",
      type = "",
    } = req.query;

    const booths = await boothService.getBoothAdmin(
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

const getBooth = asyncHandle(async (req, res, next) => {
  try {
    const { boothId, festivalId } = req.params;
    const { id: userId } = req.user;

    const isParticipated = await participationRepository.participationCheck(
      parseInt(userId),
      parseInt(festivalId)
    );

    if (!isParticipated) {
      return res.status(403).send("참여중인 축제가 아닙니다.");
    }

    const booth = await boothService.getBooth(parseInt(boothId));

    res.status(200).send(booth);
  } catch (error) {
    next(error);
  }
});

const updateBooth = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { festivalId, boothId } = req.params;
    const {
      name,
      content,
      image,
      boothType,
      typeCategory,
      accountNumber,
      bankName,
      waitingTime,
    } = req.body;

    const isParticipated = await participationRepository.participationCheck(
      parseInt(userId),
      parseInt(festivalId)
    );

    if (!isParticipated) {
      return res.status(403).send("참여중인 축제가 아닙니다.");
    }

    const booth = await boothService.updateBooth(
      parseInt(boothId),
      parseInt(userId),
      {
        name,
        content,
        image,
        boothType,
        typeCategory,
        accountNumber,
        bankName,
        waitingTime,
      }
    );
    res.status(200).send(booth);
  } catch (error) {
    next(error);
  }
});

const getMyBooths = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { festivalId } = req.params;

    const isParticipated = await participationRepository.participationCheck(
      parseInt(userId),
      parseInt(festivalId)
    );

    if (!isParticipated) {
      return res.status(403).send("참여중인 축제가 아닙니다.");
    }

    const booths = await boothService.getMyBooths(
      parseInt(userId),
      parseInt(festivalId)
    );

    if (booths.length == 0) {
      return res.status(404).send("등록된 나의 부스가 없습니다.");
    }

    res.status(200).send(booths);
  } catch (error) {
    next(error);
  }
});

const deleteBooth = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { festivalId, boothId } = req.params;

    const isParticipated = await participationRepository.participationCheck(
      parseInt(userId),
      parseInt(festivalId)
    );

    if (!isParticipated) {
      return res.status(403).send("참여중인 축제가 아닙니다.");
    }

    const booth = await boothService.getBooth(parseInt(boothId));
    if (booth.userId !== userId) {
      return res.status(403).send("부스 소유자만 삭제할 수 있습니다.");
    }

    await boothService.deleteBooth(parseInt(boothId));

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default {
  createBooth,
  getBoothAdmin,
  getBooths,
  getBooth,
  updateBooth,
  getMyBooths,
  deleteBooth,
};
