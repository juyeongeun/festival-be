import payService from "../services/payService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";

const createPay = asyncHandle(async (req, res, next) => {
  try {
    const { wishlistIds, totalPrice, payType } = req.body;
    const { id: userId } = req.user;

    const data = await payService.createPay(
      parseInt(userId),
      wishlistIds.map((id) => parseInt(id)),
      parseInt(totalPrice),
      payType
    );
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

const getPaysByUserId = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const data = await payService.getPaysByUserId(parseInt(userId));
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const getPay = asyncHandle(async (req, res, next) => {
  try {
    const { id: payId } = req.params;
    const data = await payService.getPay(parseInt(payId));
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default { createPay, getPaysByUserId, getPay };
