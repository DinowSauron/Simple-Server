import { controllerInterface, pageType } from "../types/systemTypes";
import PlaylistService from "./playlist.service";


const PlaylistController: controllerInterface = {

  getAll: async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const count = Number(req.query.count) as pageType || 10 as pageType;

    const response = await PlaylistService.getAll(page, count);
    return res.status(200).json(response);
  },

  createPlaylist: async (req, res, next) => {
    try {
      const data = req.body;

      const response = await PlaylistService.save(data);
  
      return res.status(200).json({success: true, ...response});
    } catch(e) {
      next(e)
    }
  },

  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await PlaylistService.getById(id);

      return res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  },

  updateById: async (req, res, next) => {
    try {
      const data = req.body;
      const id = req.params.id;

      const response = await PlaylistService.update(id, data);

      return res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }
};

export default PlaylistController;
