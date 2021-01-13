const config = {
  development: {
    BUCKET_NAME: "bucketName",
    BUCKET_REGION: "ap-northeast-2",
    DISTRIBUTION_ID: "cf distribution id",
  },
};

module.exports.getConfig = function (stage = "development") {
  return config[stage] || config.dev;
};

module.exports.config = config;
