import asyncHandle from "../middleware/error/asyncHandler.js";
import menuService from "../services/menuService.js";

const createMenuController = asyncHandle(async (req, res, next) => {
  try {
    const { boothId } = req.params;
    const { name, price, content } = req.body;
    const menuImage = req.file ? req.file.location : undefined;
    const data = await menuService.createMenu(
      parseInt(boothId),
      name,
      parseInt(price),
      content,
      menuImage
    );
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});

const getMenuController = asyncHandle(async (req, res, next) => {
  try {
    const { boothId } = req.params;
    const data = await menuService.getMenu(parseInt(boothId));
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const patchMenuController = asyncHandle(async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const { name, price, content } = req.body;
    const menuImage = req.file ? req.file.location : undefined;
    const data = await menuService.patchMenu(
      parseInt(menuId),
      name,
      parseInt(price),
      content,
      menuImage
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

const deleteMenuController = asyncHandle(async (req, res, next) => {
  try {
    const { id: userId, role: userRole } = req.user;
    const { menuId } = req.params;
    const data = await menuService.deleteMenu(
      parseInt(userId),
      parseInt(menuId),
      userRole
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default {
  createMenu: createMenuController,
  getMenu: getMenuController,
  patchMenu: patchMenuController,
  deleteMenu: deleteMenuController,
};
