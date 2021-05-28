// require packages
require('dotenv').config()
const AWS = require('aws-sdk');
const path = require('path')
// setting options for S3 upload
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// upload file to s3 function
const uploadFileToS3 = async (filename, data) => {
    const params = {
        Bucket: 'thejokerboxv1',                // pass your bucket name
        Key: filename,                          //filename by which it will be stored in the bucket
        Body: data
    };
    console.log("params set");
    return new Promise((resolve, reject) => {
        console.log("in promise");
        s3.upload(params, (s3Err, data) => {
            console.log("callback");
            if (s3Err) reject(s3Err.message)
            else{
                console.log("File Upload Done");
                resolve(data)
            }
        });
    })
};

const downloadFromS3 = async ( res, Key, Bucket) => {
    const params = {
        Bucket,
        Key,
    };
    return new Promise((resolve, reject) => {
        console.log("in promise");
        s3.getObject(params, (err, data) => {
            console.log("in callback");
            resolve(data.Body);
            console.log("file downloaded");
        })
    })
}

module.exports = {
    uploadFileToS3,
    downloadFromS3
}