const config = {
  development: {
    BUCKET_NAME: "bucketName",
    BUCKET_REGION: "ap-northeast-2",
    BUCKET_PATH: "/images/*", //behaviors path, cf->bucket 접근 경로 제한 설정 위해서(role)
    DISTRIBUTION_ID: "cf distribution id",
  },
};

module.exports.getConfig = function (stage = "development") {
  return config[stage] || config.dev;
};

module.exports.config = config;
