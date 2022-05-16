const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });
s3 = new AWS.S3({ apiVersion: "2006-03-01" });
module.exports = s3;
