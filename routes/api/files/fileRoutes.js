const router = require('express').Router();
const multer = require('multer');
const FileMetaData = require('../../../models/FileMetaData');
const {isLoggedIn} = require('../../../helpers/AuthHelper')
// multer setup
const upload = multer();

// controller imports
const { fileUploadController, fileDownloadController } = require('../../../controllers/FileController');

router.get('/:email', async (req, res)  => {
    const files = await FileMetaData.find().where("email").equals(req.params.email)
    res.json(files)
})

router.post('/upload', isLoggedIn, upload.single('file'), fileUploadController)

router.get('/download/:id', fileDownloadController);


module.exports = router;