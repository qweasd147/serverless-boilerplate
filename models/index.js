import fs from 'fs'
import path from 'path'
import sequelizeConn from './db'
import * as crudModels from './crud'

class Database {

  constructor () {
    this._sequelize = sequelizeConn
    this._models = {}
        
    // Load each model file
    /*
    const models = Object.assign({}, ...fs.readdirSync(__dirname)
      .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
      .filter(filePath => !fs.statSync(path.join(__dirname,filePath)).isDirectory())  //디렉토리 제거
      .map((file) => {
        const model = require(path.join(__dirname, file)).default
        
        return {
          [model.name]: model.init(this._sequelize),
        }
      })
    )
    */

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