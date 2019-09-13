import Sequelize from 'sequelize'

const {
    host, port, dialect, name, userId, password,
} = process.env

const sequelizeConn = new Sequelize(name, userId, password, {
  host: host
  , port : port
  , dialect: dialect    //db 종류
  , pool: {
      max: 5
      , min: 0
      , acquire: 30000  // 연결하는데 최대 30초 걸리도록 설정
      , idle: 10000     // 10초동안 요청 없으면 연결 끊어놓음
  }
  , operatorsAliases: false
  , logging: false
  , define: {
      freezeTableName: true     //테이블 이름이 복수 형태(ex. tableNames) 막기
      , timestamps: false       //모든 테이블에 createAt, updateAt 추가되는거 막기
      , underscored: true       //기본 snake_case로 변경
  }
  , logging: console.log
});

export default sequelizeConn;