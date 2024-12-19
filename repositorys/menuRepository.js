import prisma from "../utils/prismaClient.js";

const deleteMenu = (menuId) => {
  return prisma.menu.delete({
    where: {
      id: menuId,
    },
  });
};
const createMenu = (boothId, name, price, content, menuImage) => {
  return prisma.menu.create({
    data: {
      boothId: boothId,
      name: name,
      price: price,
      content: content,
      image: menuImage,
    },
  });
};

const getMenu = (boothId) => {
  return prisma.menu.findMany({
    where: {
      boothId: boothId,
    },
  });
};

const patchMenu = (menuId, name, price, content, menuImage) => {
  return prisma.menu.update({
    where: {
      id: menuId,
    },
    data: {
      name: name,
      price: price,
      content: content,
      image: menuImage,
    },
  });
};

const getIdMenu = (menuId) => {
  return prisma.menu.findUnique({
    where: {
      id: menuId,
    },
  });
};

export default { createMenu, getMenu, patchMenu, getIdMenu, deleteMenu };
