import {sequelize} from '../index';


const dbSync = async()=>{
    try {
        
        await sequelize.authenticate();                //연결 테스트 & 인증
        await sequelize.sync();

        console.log("db 동기화 및 테이블 동기화 성공");
    }catch(e){
        console.error("db 동기화 실패");
        console.error(e.stack);
    }

    process.exit(0);
}

export {
    dbSync
}