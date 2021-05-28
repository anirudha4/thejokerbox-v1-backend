const { Schema, model } = require('mongoose')

const FileMetaDataSchema = Schema({
    filename: {
        type: String,
        required: true
    },
    extension: {
        type: String,
        required: true
    },
    contentType:{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Bucket:{
        type: String,
        required: true
    },
    Location:{
        type: String,
        required: true
    },
    fileOneKey:{
        type: String,
        required: true
    },
    fileTwoKey:{
        type: String,
        required: true
    },
    fileThreeKey:{
        type: String,
        required: true
    }
}, {timestamps:  true});

const FileMetaData = model('file-meta-data', FileMetaDataSchema);

module.exports = FileMetaData;