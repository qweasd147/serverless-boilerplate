const healthCheck = async (ctx) => {
  await wait2sec();

  ctx.status = 200;
  ctx.body = {
    result: "ok",
  };
};

const wait2sec = () => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("success");
    }, 2000);
  });
};

export { healthCheck };
