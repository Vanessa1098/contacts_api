const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const withProcessEnv = ({ AWS_ENDPOINT, AWS_REGION, IS_OFFLINE }) => () => {
  let options;

  // we don't need to set the endpoint or region if we're running
  // from within AWS
  if (!!IS_OFFLINE) {
    // IS_OFFLINE is set by the serverless-offline-plugin
    options = {
      endpoint: AWS_ENDPOINT,
      region: AWS_REGION,
    };
  }

  return new DocumentClient(options);
};

module.exports = {
  withProcessEnv
};