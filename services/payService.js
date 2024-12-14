import payRepository from "../repositorys/payRepository.js";
import wishlistRepository from "../repositorys/wishlistRepository.js";

function randomWaitingNumber(userId) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = userId.toString();

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

const createPay = async (userId, wishlistId, totalPrice, payType) => {
  try {
    const waitingNumber = randomWaitingNumber(userId);
    const boothInfo = await wishlistRepository.getWaitingComment(wishlistId);
    if (!boothInfo?.boothId) {
      throw new Error("부스 정보를 찾을 수 없습니다");
    }

    const pay = await payRepository.createPay({
      userId,
      price: totalPrice,
      payType,
      waitingNumber,
      boothId: boothInfo.boothId,
    });

    return {
      pay,
      waitingTime: boothInfo.booth.waitingTime,
    };
  } catch (error) {
    throw new Error(`결제 생성 중 오류 발생: ${error.message}`);
  }
};

export default { createPay };
