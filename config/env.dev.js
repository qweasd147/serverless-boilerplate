const secret = {
    db : {
        host : "localhost"
        , port : 3306
        //, dialect : "mysql" //db 종류
        , dialect : "mariadb"
        , name : "joo"      //데이터베이스 이름(스키마)
        , userId : "joohyung"
        , password : "joo123"
    }
}

module.exports = secret;