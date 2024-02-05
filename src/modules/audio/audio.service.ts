import { musicsDB } from './../musics/musics.service';
import Database from "../../database";
import { pageType } from "../types/systemTypes";
import baseService from "../../utils/baseService"

const AudioService = {
  ...baseService(musicsDB),


  getUrlById: async (id: string) => {
    const res = musicsDB.getById(id)
    if(!res) {
      throw new Error("Não existe audio com este ID")
    }

    return res.src;
  },

}


export default AudioService;