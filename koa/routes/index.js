import Router from 'koa-router';
import healthCheck from './health';

const router = new Router();

router.get('/check', healthCheck);
router.get('/error', (ctx)=>{
    //ctx.throw(500,'Error Message');
    throw new Error('force error!!');
});

const apiRouters = (prefix)=>{
    router.prefix(prefix);
    return router;
}

export default apiRouters;