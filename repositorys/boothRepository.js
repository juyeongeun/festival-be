import prisma from "../utils/prismaClient.js";

const createBooth = (userId, festivalId, data, boothImage) => {
  return prisma.booth.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      festival: {
        connect: {
          id: festivalId,
        },
      },
      ...data,
      image: boothImage,
    },
  });
};

const getBoothAdmin = (festivalId, page, pageSize, orderBy, keyword, type) => {
  const skip = (page - 1) * pageSize;
  const where = {
    festivalId: festivalId,
  };

  const validBoothTypes = ["EAT", "PLAY", "ETC"];
  if (type && validBoothTypes.includes(type)) {
    where.boothType = type;
  }

  if (keyword) {
    where.AND = [
      {
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
        ],
      },
    ];
  }

  const validOrders = ["recent", "older"];

  if (!validOrders.includes(orderBy)) {
    orderBy = "recent";
  }

  return prisma.booth.findMany({
    where,
    take: pageSize,
    skip,
    orderBy: { createdAt: orderBy == "recent" ? "desc" : "asc" },
    include: {
      user: {
        select: {
          id: true,
          userName: true,
          nickname: true,
          role: true,
        },
      },
      festival: true,
    },
  });
};

const getBooths = (festivalId, page, pageSize, orderBy, keyword, type) => {
  const skip = (page - 1) * pageSize;
  const where = {
    festivalId: festivalId,
    accept: "ACCEPT",
  };

  const validBoothTypes = ["EAT", "PLAY", "ETC"];
  if (type && validBoothTypes.includes(type)) {
    where.boothType = type;
  }

  if (keyword) {
    where.AND = [
      {
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
        ],
      },
    ];
  }

  const validOrders = ["recent", "older"];

  if (!validOrders.includes(orderBy)) {
    orderBy = "recent";
  }

  return prisma.booth.findMany({
    where,
    take: pageSize,
    skip,
    orderBy: { createdAt: orderBy == "recent" ? "desc" : "asc" },
    include: {
      user: {
        select: {
          id: true,
          userName: true,
          nickname: true,
          role: true,
        },
      },
    },
  });
};

const getBooth = (boothId) => {
  return prisma.booth.findUnique({
    where: {
      id: boothId,
    },
    include: {
      user: {
        select: {
          id: true,
          userName: true,
          nickname: true,
          role: true,
        },
      },
    },
  });
};

const updateBooth = (boothId, data, boothImage) => {
  return prisma.booth.update({
    where: {
      id: boothId,
    },
    data: {
      ...data,
      image: boothImage,
    },
  });
};

const BoothCheck = async (userId, boothId) => {
  const pay = await prisma.booth.findFirst({
    where: { userId: userId, id: boothId },
  });
  return pay;
};

const getMyBooths = (userId, festivalId) => {
  return prisma.booth.findFirst({
    where: {
      userId: userId,
      festivalId: festivalId,
    },
    include: {
      user: {
        select: {
          id: true,
          userName: true,
          nickname: true,
          role: true,
        },
      },
      festival: {
        select: {
          id: true,
          festivalCode: true,
          mapImage: true,
        },
      },
    },
  });
};

const getBoothName = (festivalId) => {
  return prisma.booth.findMany({
    where: {
      festivalId: festivalId,
    },
    select: {
      id: true,
      name: true,
    },
  });
};

const deleteBooth = (boothId) => {
  return prisma.booth.delete({
    where: {
      id: boothId,
    },
  });
};
export default {
  createBooth,
  getBoothAdmin,
  getBooths,
  getBooth,
  updateBooth,
  getMyBooths,
  deleteBooth,
  getBoothName,
  BoothCheck,
};
