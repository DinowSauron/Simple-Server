import Database from "../../database";
import { pageType } from "../types/systemTypes";
import baseService from "../../utils/baseService"
import { playlistDB } from "../playlist/playlist.service"

const AudioService = {
  ...baseService(playlistDB),


  getUrlById: async (id: string) => {
    const res = playlistDB.getById(id)
    if(!res) {
      throw new Error("Não existe audio com este ID")
    }

    return res.src;
  },

}


export default AudioService;