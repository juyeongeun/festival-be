import menuRepository from "../repositorys/menuRepository.js";
import boothRepository from "../repositorys/boothRepository.js";
const deleteMenu = async (userId, menuId, userRole) => {
  const menu = await menuRepository.getIdMenu(menuId);
  const booth = await boothRepository.getBooth(menu.boothId);

  if (booth.userId !== userId && userRole !== "ADMIN") {
    throw new Error("삭제 권한이 없습니다.");
  }
  const data = await menuRepository.deleteMenu(menuId);
  return data;
};
const patchMenu = async (menuId, name, price, content, menuImage) => {
  const data = await menuRepository.patchMenu(
    menuId,
    name,
    price,
    content,
    menuImage
  );
  return data;
};
const createMenu = async (boothId, name, price, content, menuImage) => {
  const data = await menuRepository.createMenu(
    boothId,
    name,
    price,
    content,
    menuImage
  );
  return data;
};
const getMenu = async (boothId) => {
  const data = await menuRepository.getMenu(boothId);
  return data;
};

export default { createMenu, getMenu, patchMenu, deleteMenu };
