import { User } from "../../models/User";

const signUp = async (ctx, next) => {
  const { email, name, password } = ctx.request.body;

  const createdUser = await User.adminCreateUser(email, password, name);
  const adminInitAuth = await User.adminInitiateAuth(email, password);

  const result = await User.adminRespondToAuthChallenge(
    email,
    password,
    adminInitAuth
  );

  console.log("result", result);

  ctx.status = 201;
  ctx.body = {
    result: result,
  };
};

const signIn = async (ctx, next) => {
  const { email, password } = ctx.request.body;

  const result = await User.adminInitiateAuth(email, password);

  ctx.status = 201;
  ctx.body = {
    result: result,
  };
};

const signOut = async (ctx, next) => {
  const token = ctx.request?.header?.authorization?.replace("Bearer ", "");
  const result = await User.signOut(token);
  ctx.status = 204;
};

const findMe = async (ctx, next) => {
  const token = ctx.request?.header?.authorization?.replace("Bearer ", "");
  const me = await User.findMe(token);

  ctx.body = {
    result: me,
  };
};

export { signUp, signIn, signOut, findMe };
