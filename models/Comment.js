import Sequelize from 'sequelize'

export default class Comment extends Sequelize.Model {
  static init(sequelize) {
    let options = {}
    options.sequelize = sequelize
    options.tableName = "comment"

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
    this.belongsTo(models.Article, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
        , name : 'article_idx'
      }
      , targetKey : 'idx'   //fk는 article의 idx를 본다.
    })
  }
}