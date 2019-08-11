import Sequelize from 'sequelize'

export default class Article extends Sequelize.Model {
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
    this.hasMany(models.Comment, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
  }
}