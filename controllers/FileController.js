// requiring helper functions
const { extractExtension, extractType, split,  genId, merge } = require('../helpers/helperFunctions')
const { insertMetaData } = require('../helpers/DBHelper')
const { uploadFileToS3, downloadFromS3 } = require('../helpers/S3Helper');
const FileMetaData = require('../models/FileMetaData');
const fs = require('fs')

const fileUploadController = async (req, res, next) => {
    const {email} = req.body;
    const {originalname: filename,  mimetype, buffer, size} = req.file
    try{
        const [file1, file2, file3] = await split(buffer)
        const file1Upload = uploadFileToS3(genId() + filename, file1)
        const file2Upload = uploadFileToS3(genId() + filename, file2)
        const file3Upload = uploadFileToS3(genId() + filename, file3)
        // execute all at once
        Promise.all([file1Upload, file2Upload, file3Upload])
        .then(async ([{Key: fileOneKey, Location, Bucket}, {Key: fileTwoKey}, {Key: fileThreeKey}])=>{
                const data = await insertMetaData({email, filename, extension: extractExtension(filename),contentType: mimetype,  type: extractType(mimetype), size, fileOneKey, fileTwoKey, fileThreeKey,  Bucket, Location });
                if(data){
                    res.json({
                        message: 'Meta Data inserted Successfully',
                        file: data,
                        success: true,
                    })
                    return
                }
                else{
                    res.json({
                        message: 'There was some problem inserting data'
                    })
                    return
                }
            }
        )
        .catch(err => {
            console.log(err);
        })
    }
    catch(err){
        res.json({
            message: "Something went wrong",
            err: err.message
        })
    }

}

const fileDownloadController = async (req, res, next) => {
    const {contentType, filename, fileOneKey, fileTwoKey, fileThreeKey} = await FileMetaData.findOne({_id: req.params.id})
    const file1 = downloadFromS3(res, fileOneKey, "thejokerboxv1")
    const file2 = downloadFromS3(res, fileTwoKey, "thejokerboxv1")
    const file3 = downloadFromS3(res, fileThreeKey, "thejokerboxv1")
    Promise.all([file1, file2, file3])
    .then(async ([blob1, blob2, blob3]) => {
        const data = await merge([blob1,blob2, blob3])
        res.send({
            file: data.toString('base64'),
            filename,
            contentType
        });
    })
    .catch(err => {
        res.send({
            status: "Not Ok"
        })
    })
}

module.exports = {
    fileUploadController,
    fileDownloadController
}

