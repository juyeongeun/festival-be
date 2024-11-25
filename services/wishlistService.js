import wishlistRepository from "../repositorys/wishlistRepository.js";
import checkUser from "../utils/checkUser.js";

const createWishlist = async (userId, festivalId, boothId, items) => {
  await checkUser(userId, festivalId);

  const promises = items.map(async (item) => {
    const { menuId, cnt, price } = item;

    const cartItem = {
      menuId,
      userId,
      boothId,
      cnt,
      price,
    };
    await wishlistRepository.createWishlist(cartItem);
  });
  return await Promise.all(promises);
};

const updateWishlist = async (userId, festivalId, boothId, items) => {
  await checkUser(userId, festivalId);

  const promises = items.map(async (item) => {
    const { menuId, cnt, price } = item;

    const cartItem = {
      menuId,
      userId,
      boothId,
      cnt,
      price,
    };
    await wishlistRepository.updateWishlist(cartItem);
  });
  await Promise.all(promises);
};

const deleteWishlist = async (userId, festivalId, wishlistId) => {
  await checkUser(userId, festivalId);
  return await wishlistRepository.deleteWishlist(wishlistId);
};

const getWishlists = async (userId, festivalId, boothId) => {
  await checkUser(userId, festivalId);
  return await wishlistRepository.getWishlists(userId, boothId);
};

export default { createWishlist, updateWishlist, deleteWishlist, getWishlists };
