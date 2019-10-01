'use strict';

const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const httpUrlEncodeBodyParser = require('@middy/http-urlencode-body-parser');
const inputOutputLogger = require('@middy/input-output-logger');
const { httpMultipartBodyParser } = require('middy/middlewares')

const fileupload = middy(async (event) => {

  console.log('body', event.body.name);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
});

fileupload.use(httpMultipartBodyParser());

module.exports.fileupload = fileupload;


module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
