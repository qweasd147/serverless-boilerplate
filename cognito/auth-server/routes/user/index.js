import Router from "koa-router";
import { signUp, signIn, signOut, findMe } from "./ctrl";
import { errors } from "../../models/User";

const userErrHandler = (fn) => async (ctx, next) => {
  try {
    await fn(ctx, next);
  } catch (err) {
    console.error("에러남", err);

    const errCode = err?.code;
    if (!errCode) throw err;

    const status = errors?.[errCode]?.status;

    if (!status) throw err;

    ctx.status = status;
    ctx.body = {
      message: err.message,
    };
  }
};

const router = Router();
router.post("/", userErrHandler(signUp));
router.post("/signin", userErrHandler(signIn));
router.get("/signout", userErrHandler(signOut));
router.get("/me", userErrHandler(findMe));

export default router;
