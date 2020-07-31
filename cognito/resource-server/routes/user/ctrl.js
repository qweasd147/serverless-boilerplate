import { TokenParser } from "../../token";
import { promisify } from "util";

const toVerifiedClaim = promisify(TokenParser.verifiedClaim);

const findUser = async (ctx) => {
  const idToken = ctx.request?.header?.authorization?.replace("Bearer ", "");

  if (!idToken) throw new Error("토큰값을 찾을수 없음");

  //const result = await TokenParser.verifiedClaim(idToken);
  const result = await toVerifiedClaim(idToken);
  console.log("token result", result);

  ctx.status = 200;
  ctx.body = {
    result,
  };
};

export { findUser };
