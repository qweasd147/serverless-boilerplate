import Router from "koa-router";
import health from "./health";
import user from "./user";

const router = new Router();

router.use("/health", health.routes());
router.use("/users", user.routes());

const apiRouters = (prefix) => {
  router.prefix(prefix);
  return router;
};

export default apiRouters;
