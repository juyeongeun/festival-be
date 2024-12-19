import payRepository from "../repositorys/payRepository.js";
import boothRepository from "../repositorys/boothRepository.js";
const getPay = async (userId, boothId, page, pageSize, startDate, endDate) => {
  const pay = await boothRepository.BoothCheck(userId, boothId);
  if (!pay) {
    throw new Error("권한이 없습니다.");
  }
  const payData = await payRepository.getPayData(
    userId,
    boothId,
    page,
    pageSize,
    startDate,
    endDate
  );

  const totalPrice = payData.reduce((sum, pay) => sum + pay.price, 0);

  return { payData: processedPayData, totalPrice };
};

export default { getPay };
