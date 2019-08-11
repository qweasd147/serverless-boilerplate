import Sequelize from 'sequelize'

export default class Comment extends Sequelize.Model {
  static init(sequelize) {
    let options = {}
    options.sequelize = sequelize

    return super.init({
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contents: {
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
      }
    })
  }
}