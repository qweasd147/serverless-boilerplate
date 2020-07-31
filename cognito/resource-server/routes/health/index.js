import Router from "koa-router";
import { healthCheck } from "./ctrl";

const router = Router();
router.get("/", healthCheck);

export default router;
