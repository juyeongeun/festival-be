import festivalService from '../services/festivalServices.js';
export async function patchFestival(req, res, next) {
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
}
