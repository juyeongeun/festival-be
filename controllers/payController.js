import payService from "../services/payService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";

const createPay = asyncHandle(async (req, res, next) => {
  try {
    const { wishlistId } = req.params;
    const { id: userId } = req.user;
    const { totalPrice } = req.body;

    const data = await payService.createPay(
      parseInt(userId),
      parseInt(wishlistId),
      totalPrice
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default { createPay };
