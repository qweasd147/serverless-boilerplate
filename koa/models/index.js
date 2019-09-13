import fs from 'fs'
import path from 'path'
import sequelizeConn from './db'
import * as crudModels from './crud'

class Database {

  constructor () {
    this._sequelize = sequelizeConn
    this._models = {}

    const models =Object.assign({}, ...Object.keys(crudModels).map(modelKey=>crudModels[modelKey]).map(model => {
      return {
        [model.name]: model.init(this._sequelize),
      }
    }));

    // Load model associations
    for (const model of Object.keys(models)) {
      typeof models[model].associate === 'function' && models[model].associate(models);
    }

    this._models = models
  }

  get sequelize () {
    return this._sequelize
  }

  get models () {
    return this._models
  }

}

const database = new Database()

export const models = database.models
export const sequelize = database.sequelize