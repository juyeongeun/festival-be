import prisma from "../utils/prismaClient.js";

const festivalImagePatch = async (festivalId, mapImage) => {
  const data = await prisma.festival.update({
    where: {
      id: festivalId,
    },
    data: {
      mapImage: mapImage,
    },
  });
  return data;
};

export default { festivalImagePatch };
