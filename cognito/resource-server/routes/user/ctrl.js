import { TokenParser } from "../../token";

const findUser = async (ctx) => {
  const idToken = ctx.request?.header?.authorization?.replace("Bearer ", "");

  if (!idToken) throw new Error("토큰값을 찾을수 없음");

  try {
    const result = await TokenParser.verifiedClaim(idToken);
    console.log("token result", result);

    ctx.status = 200;
    ctx.body = {
      result,
    };
  } catch (err) {
    console.log("error", err);

    throw err;
  }
};

export { findUser };
