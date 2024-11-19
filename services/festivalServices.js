import * as festivalRepositorys from '../repositorys/festivalRepositorys.js';

const patchFestivalImg = async (festivalId, mapImage) => {
  const festivalPatch = await festivalRepositorys.festivalImagePatch(
    festivalId,
    mapImage
  );
  return festivalPatch;
};

export default { patchFestivalImg };
