"use strict";

const { getConfig } = require("./config");
const querystring = require("querystring");
const AWS = require("aws-sdk");
const sizeOf = require("image-size");
const Sharp = require("sharp");

module.exports.hello = async (event, context, callback) => {
  const { request, response } = event.Records[0].cf;
  const params = querystring.parse(request.querystring);

  if (!params.d && !params.w && !params.h) {
    return callback(null, response);
  }

  const stageValues = request.headers["x-lambda-stage"] || [];
  const stage = stageValues[0] || {};
  //if exists header. => request.headers["x-lambda-stage"][0].value

  const { BUCKET_NAME, BUCKET_REGION } = getConfig(stage.value);

  const targetSize = parseSizeParams(params);

  if (!targetSize.width && !!targetSize.height) {
    console.log("사이즈 잘못됨");
    return callback(null, response);
  }

  const S3 = new AWS.S3({ region: BUCKET_REGION });

  const uri = request.uri;
  const [, imageName, extension] = uri.match(/\/(.*)\.(.*)/);
  const originalKey = decodeURI(`${imageName}.${extension}`).replace("+", " ");

  try {
    const s3Object = await S3.getObject({
      Bucket: BUCKET_NAME,
      Key: originalKey,
    }).promise();

    const originImageInfo = sizeOf(s3Object.Body);

    // sharp에서는 jpg 대신 jpeg사용
    const originFormat = originImageInfo.type;
    const requiredFormat = originFormat === "jpg" ? "jpeg" : originFormat; // 썸네일 기본으로 jpeg 포맷
    const size = fitSize(targetSize, originImageInfo);

    const resizedImage = await Sharp(s3Object.Body)
      .resize(size.width, size.height)
      .toFormat(requiredFormat)
      .toBuffer();

    response.status = 200;
    response.body = resizedImage.toString("base64");
    response.bodyEncoding = "base64";
    response.headers = {
      "content-type": [
        { key: "Content-Type", value: `image/${requiredFormat}` },
      ],
    };

    return callback(null, response);
  } catch (error) {
    console.error(`key : ${originalKey}, bucket :  ${BUCKET_NAME}`, error);
    return callback(error);
  }
};

/**
 * 이미지를 리사이징 하기 위한 크기 파라메터를 파싱한다.
 *
 * @param {Object} params - 쿼리 스트링으로 전달 받은 파라메터
 * @param {string} params.d - 가로, 세로 길이
 * @param {string} params.w - 가로 길이
 * @param {string} params.h - 세로 길이
 */
function parseSizeParams(params) {
  // dimension 값이 있는 경우, 가로 세로 같은 값으로 취급한다.
  const { d, w, h } = params;

  if (d) {
    const safeDimension = safeImageSize(d);
    return {
      width: safeDimension,
      height: safeDimension,
    };
  }

  return {
    width: safeImageSize(w),
    height: safeImageSize(h),
  };
}

function safeImageSize(size) {
  size = size * 1;
  if (Number.isSafeInteger(size) && size > 1 && size < 1025) {
    return size;
  }

  return null;
}

/**
 * 리사이즈 값의 넓이 또는 높이만 있는 경우 원본 비율에 맞춰 계산한다.
 *
 * @param {Object} targetSize - 리사이즈 이미지 크기
 * @param {Object} originSize - 원본 이미지 크기
 */
function fitSize(targetSize, originSize) {
  if (targetSize.width > 0 && targetSize.height > 0) {
    return {
      ...targetSize,
    };
  }

  if (!targetSize.width && targetSize.height > 0) {
    return {
      width: Math.round(
        (targetSize.height * originSize.width) / originSize.height
      ),
      height: targetSize.height,
    };
  }

  if (!targetSize.height && targetSize.width > 0) {
    return {
      width: targetSize.width,
      height: Math.round(
        (targetSize.width * originSize.height) / originSize.width
      ),
    };
  }

  return null;
}
