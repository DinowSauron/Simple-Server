import { controllerInterface, pageType } from "../types/systemTypes";
import MusicsService from "./musics.service";

const MusicsController: controllerInterface = {

  getMusicsByPlaylistId: async (req, res, next) => {
    const playlistId = req.params.playlistId;

    const response = await MusicsService.getByPLaylistId(playlistId)

    return res.status(200).json(response)
  },

  getAll: async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const count = (Number(req.query.count) as pageType) || (10 as pageType);

    const response = await MusicsService.getAll(page, count);
    return res.status(200).json(response);
  },

  createMusic: async (req, res, next) => {
    try {
      const data = req.body;

      const response = await MusicsService.save(data);

      return res.status(200).json({ success: true, ...response });
    } catch (e) {
      next(e);
    }
  },

  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await MusicsService.getById(id);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  updateById: async (req, res, next) => {
    try {
      const data = req.body;
      const id = req.params.id;

      const response = await MusicsService.update(id, data);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default MusicsController;
