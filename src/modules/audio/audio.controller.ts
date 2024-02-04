import { controllerInterface, pageType } from "../types/systemTypes";
import AudioService from "./audio.service";
import path from 'path';


const AudioController: controllerInterface = {
  getById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await AudioService.getUrlById(id);

      return res.sendFile(path.resolve(response));
    } catch(e) {
      next(e);
    }
  },
};

export default AudioController;
