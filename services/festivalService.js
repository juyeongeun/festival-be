import festivalRepository from "../repositorys/festivalRepository.js";

const patchFestivalImg = async (festivalId, mapImage) => {
  const festivalPatch = await festivalRepository.festivalImagePatch(
    festivalId,
    mapImage
  );
  return festivalPatch;
};

export default { patchFestivalImg };
