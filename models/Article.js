import Sequelize from 'sequelize'

export default class Article extends Sequelize.Model {
  static init(sequelize) {
    let options = {}
    options.sequelize = sequelize
    options.tableName = "article"

    return super.init({
      idx: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
      , subject: {
        type: Sequelize.STRING,
        allowNull: false,
      }
      , contents: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    }, options)
  }

  static associate(models) {
    this.hasMany(models.Comment, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
        , name : 'article_idx'  //target의 foreign key
      }
      , sourceKey : 'idx'     //source의 key값
    })
  }
}