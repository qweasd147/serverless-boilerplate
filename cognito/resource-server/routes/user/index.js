import Router from "koa-router";
import { findUser } from "./ctrl";

const router = Router();
router.get("/me", findUser);

export default router;
