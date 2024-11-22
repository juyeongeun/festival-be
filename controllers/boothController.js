import boothService from "../services/boothService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";

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

export default { createBooth };
