import Database from "../../database";
import { pageType } from "../types/systemTypes";
import baseService from "../../utils/baseService"
export const musicsDB = new Database("musics");

const MusicsService = {
  ...baseService(musicsDB),
  
  save: async (data: any) => {
    if(data.id) {
      throw new Error("Não insira um id")
    }
    verifyDuplicated(data)

    return musicsDB.insert(data)
  },

  getByPLaylistId: async (id: string) => {
    const musics = musicsDB.getWhereMany((music) => music.playlistId === id)

    return musics
  },

  getById: async (id: string) => {
    const res = musicsDB.getById(id)
    if(!res) {
      throw new Error("Não existe playlist com este ID")
    }

    return res;
  },

  update: async (id: string, data: any) => {
    const res = musicsDB.getById(id)
    if(!res) {
      throw new Error("Não existe playlist com este ID")
    }
    verifyDuplicated(data)

    const updated = musicsDB.update(id, data)

    return updated
  }
}


function verifyDuplicated(data: {songName:string}) {
  const hasDuplicated = musicsDB.getWhereOne(item => item.songName === data.songName);
  if(hasDuplicated) {
    throw new Error("Já existe uma playlist com esse nome")
  }
}

export default MusicsService;