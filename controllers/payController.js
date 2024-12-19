import payService from "../services/payService.js";
import asyncHandle from "../middleware/error/asyncHandler.js";

// const createPay = asyncHandle(async (req, res, next) => {
//   try {
//     const { wishlistId } = req.params;
//     const { id: userId } = req.user;
//     const { totalPrice } = req.body;

//     const data = await payService.createPay(
//       parseInt(userId),
//       parseInt(wishlistId),
//       totalPrice
//     );
//     res.status(200).send(data);
//   } catch (error) {
//     next(error);
//   }
// });

// export default { createPay };

const getPay = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { boothId } = req.params;
    const { page = 1, pageSize = 10, startDate = "", endDate = "" } = req.query;
    const data = await payService.getPay(
      parseInt(userId, 10),
      parseInt(boothId, 10),
      parseInt(page, 10) || 1,
      parseInt(pageSize, 10) || 10,
      startDate,
      endDate
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default { getPay };
