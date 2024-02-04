import Database from "../../database";
import { pageType } from "../types/systemTypes";
import baseService from "../../utils/baseService"
export const playlistDB = new Database("playlist");

const PlaylistService = {
  ...baseService(playlistDB),

  save: async (data: any) => {
    if(data.id) {
      throw new Error("Não insira um id")
    }
    verifyDuplicated(data)

    return playlistDB.insert(data)
  },

  getById: async (id: string) => {
    const res = playlistDB.getById(id)
    if(!res) {
      throw new Error("Não existe playlist com este ID")
    }

    return res;
  },

  update: async (id: string, data: any) => {
    const res = playlistDB.getById(id)
    if(!res) {
      throw new Error("Não existe playlist com este ID")
    }
    verifyDuplicated(data)

    const updated = playlistDB.update(id, data)

    return updated
  }
}


function verifyDuplicated(data: {songName:string}) {
  const hasDuplicated = playlistDB.getWhereOne(item => item.songName === data.songName);
  if(hasDuplicated) {
    throw new Error("Já existe uma playlist com esse nome")
  }
}

export default PlaylistService;