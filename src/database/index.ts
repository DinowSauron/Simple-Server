import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

type defaultData = {
  updated_at: Date;
  created_at: Date;
  id: string;
  [key:string]: any;
}

class Database {
  private data: defaultData[];
  private path = './src/database/data/';
  private entity: string;
  public name: string;

  // função inicial que é chamada assim que se crio o objeto
  constructor(entity: string) {
    this.name = entity;
    this.entity = entity;
    this.data = [];
    this.path += entity.toLocaleLowerCase() + '.json';

    try {
      this.data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    } catch {
      const jsonData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, jsonData, 'utf-8');
    }
    this.log("Iniciado.");

  }

  // Funções privadas só são acessadas pelo codigo dentro da classe
  private persist() {
    const jsonData = JSON.stringify(this.data, null, 2);
    fs.writeFileSync(this.path, jsonData, 'utf-8');
  }
  private log(message: string) {
    // comente isso para desabilitar todos os logs:
    console.log('\x1b[34mDATABASE\x1b[0m', `(${this.entity}) -- ` + message)
  }
  private error(message: string) {
    throw new Error(`DATABASE ERROR (${this.entity}) -- ` + message);
  }
  

  insert(item: {[key: string]:any}) {
    item.created_at = new Date();
    item.updated_at = new Date();
    item.id = uuidv4();

    this.data.push(item as defaultData)
    this.persist();
    return item as defaultData;
  }

  update(id: string, newValue: any) {
    const itemIndex = this.data.findIndex((item) => item.id === id)
    if(!itemIndex || itemIndex === -1){
      this.error("Item não encontrado com este ID");
    }

    newValue.updated_at = new Date();
    delete(newValue.id);
    delete(newValue.created_at);
    
    Object.entries(newValue).forEach(([key, value]) => {
      this.data[itemIndex][key] = value;
    })
    this.persist();
    return this.data[itemIndex];
  }

  delete(id: string) {
    const itemIndex = this.data.findIndex((item) => item.id === id)
    if(!itemIndex || itemIndex === -1){
      this.error("Item não encontrado com este ID");
    }
    delete(this.data[itemIndex]); 
    this.data = this.data.filter(item => item);
    this.persist();
    return true;
  }

  count() {
    return this.data.length;
  }

  getWhereMany(condition: (item: defaultData) => boolean) {
    return this.data.filter(condition);
  }
  getWhereOne(condition: (item: defaultData) => boolean) {
    return this.data.filter(condition)[0];
  }
  getById(id: string) {
    return this.data.find(item => item.id === id);
  }

  /**
   * @param page Pagina Atual
   * @param count Quantidade Por Pagina
   * @returns Número de quantidade ou inferior
   */
  getAllPaged(page = 1, count:5|10|20|50 = 10) {
    if(page < 1) {
      this.error("Necessário uma paginação maior que 1")
    }
    const items = this.data.slice(page * count - count, page*count)
    return {
      data: items,
      page: page,
      total: this.data.length
    }
  }
}


export default Database;