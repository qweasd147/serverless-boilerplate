import Koa from "koa";
import koaBody from "koa-body";
import apiRouters from "./routes";
import cors from "@koa/cors";

const app = new Koa();
const apiRouter = apiRouters("/api");

app
  .use(cors())
  .use(koaBody())
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.log("에러남", err);
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: "ERROR!",
      };
    }
  })
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods());

//app.listen(process.env.port || 3000);

export default app;
