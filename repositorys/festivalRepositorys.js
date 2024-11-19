import Prisma from '../utils/prismaClient.js';

const festivalImagePatch = async (festivalId, mapImage) => {
  const data = await Prisma.festival.update({
    where: {
      id: festivalId,
    },
    data: {
      mapImage: mapImage,
    },
  });
  return data;
};

export { festivalImagePatch };
