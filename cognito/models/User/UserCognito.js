import AWS from "aws-sdk";

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: "ap-northeast-2",
});

const { USER_POOL_ID, USER_POOL_CLIENT_ID } = process.env;

const adminCreateUser = async (email, password, name) => {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: email,
    MessageAction: "SUPPRESS",
    TemporaryPassword: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "name",
        Value: name,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
  };

  return await cognito.adminCreateUser(params).promise();
};

const adminInitiateAuth = async (email, password) => {
  const params = {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    ClientId: USER_POOL_CLIENT_ID,
    UserPoolId: USER_POOL_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };
  return cognito.adminInitiateAuth(params).promise();
};

const adminRespondToAuthChallenge = async (email, password, data) => {
  const challengeResponseData = {
    USERNAME: email,
    NEW_PASSWORD: password,
  };
  const params = {
    ChallengeName: "NEW_PASSWORD_REQUIRED",
    ClientId: USER_POOL_CLIENT_ID,
    UserPoolId: USER_POOL_ID,
    ChallengeResponses: challengeResponseData,
    Session: data.Session,
  };
  return await cognito.adminRespondToAuthChallenge(params).promise();
};

const signOut = async (token) => {
  return await cognito
    .globalSignOut({
      AccessToken: token,
    })
    .promise();
};

const findMe = async (token) => {
  return await cognito
    .getUser({
      AccessToken: token,
    })
    .promise();
};

export default {
  adminCreateUser,
  adminInitiateAuth,
  adminRespondToAuthChallenge,
  signOut,
  findMe,
};
