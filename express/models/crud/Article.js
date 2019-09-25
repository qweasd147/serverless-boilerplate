import Sequelize from 'sequelize'

export default class Article extends Sequelize.Model {
  static init(sequelize) {

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
    }, {
      sequelize
      , tableName : 'article'
    })
  }

  static associate(models) {
    this.hasMany(models.Comment, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
        , name : 'articleIdx'  //target의 foreign key
      }
      , sourceKey : 'idx'     //source의 key값
      , as : 'Comments'
    })
  }

  instanceMethod(){
    console.log(this.subject, this.contents);
  }

  async addComments(){

    const Comment = this.sequelize.models.Comment;

    await Comment.create({
      subject : 'create from article. subject'
      , contents : 'create from article. contents'
      , articleIdx : this.idx
    });
  }

  static staticMethod(){
    console.log('static method!');
  }
}