import payService from "../services/payService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";

const createPay = asyncHandle(async (req, res, next) => {
  try {
    const { wishlistId } = req.params;
    const { id: userId } = req.user;
    const { totalPrice, payType } = req.body;

    const data = await payService.createPay(
      parseInt(userId),
      parseInt(wishlistId),
      parseInt(totalPrice),
      payType
    );
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

export default { createPay };
