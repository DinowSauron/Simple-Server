import Database from "../database";
import { pageType } from "../modules/types/systemTypes";

/**
 * Função basica para os metodos mais utilizados.
 * @param database banco de dados já inicializado
 */
export default function baseService(database: Database) {
  return {
    getAll: async (page=1, count:pageType = 10) => {
      const res = database.getAllPaged(page, count);

      return {
        ...res,
        pages: Math.ceil(res.total / count)
      };
    },

    getById: async (id: string) => {
      const res = database.getById(id)
      if(!res) {
        throw new Error(`Não existe ${database.name} com este ID`);
      }

      return res;
    },

    save: async (data: any) => {
      database.insert(data);
    },

    update: async (id: string, data: any) => {
      const res = database.getById(id);
      if(!res) {
        throw new Error(`Não existe ${database.name} com este ID`);
      }
  
      const updated = database.update(id, data);
      return updated
    },

    delete: async (id: string) => {
      const res = database.getById(id);
      if(!res) {
        throw new Error(`Não existe ${database.name} com este ID`);
      }
      database.delete(id);
      return true;
    }
  }
}