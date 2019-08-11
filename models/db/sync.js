const Models = require('../index');
const sequelize = require('../index');

async function dbSync(){
    try {
        
        await sequelize.sequelize.authenticate();                //연결 테스트 & 인증
        await Models.sequelize.sync();

        console.log("db 동기화 및 테이블 동기화 성공");
    }catch(e){
        Mconsole.error("db 동기화 실패");
        console.error(e.stack);
    }

    process.exit(0);
}

dbSync();