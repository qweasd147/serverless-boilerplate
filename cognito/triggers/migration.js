export const main = async (event, context, callback) => {
  try {
    if (event.triggerSource !== "UserMigration_Authentication") {
      callback(null, event);
      return;
    }

    const email = event.userName;

    //이메일 도메인이 google인 것들만 마이그레이션 허용
    if (!email?.endsWith("gmail.com")) {
      callback(null, event);
      return;
    }

    event.response.userAttributes = {
      email: email,
      email_verified: "true",
      name: "temp_name",
    };
    event.response.finalUserStatus = "CONFIRMED";
    event.response.messageAction = "SUPPRESS";

    context.succeed(event);
  } catch (err) {
    console.log("migration error", err);
    callback("bad request");
  }
};
