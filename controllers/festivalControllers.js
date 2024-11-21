import festivalService from "../services/festivalServices.js";
import asyncHandle from "../middleware/error/asyncHandler.js";
const patchFestivalController = asyncHandle(async (req, res, next) => {
  try {
    const { festivalId } = req.params;
    const { mapImage } = req.body;

    const data = await festivalService.patchFestivalImg(
      parseInt(festivalId),
      mapImage
    );
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

export default { patchFestival: patchFestivalController };
