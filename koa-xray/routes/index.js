import Router from "koa-router";
import health from "./health";

const router = new Router();

router.use("/health", health.routes());
router.get("/error", (ctx) => {
  //ctx.throw(500,'Error Message');
  throw new Error("force error!!");
});

const apiRouters = (prefix) => {
  router.prefix(prefix);
  return router;
};

export default apiRouters;
