const express = require('express');
const router = express.Router();
const cvsService = require('../services/csv-service')


router.post('/test', async (req, res) => {
    const successFunction = (response) => {
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: response.file.name,
                mimetype: response.file.mimetype,
                size: response.file.size,
                value: response.values
            }
        });
    }
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let file = req.files.file;
            const objects = cvsService.csvToObjs(file)
            cvsService.saveToDb(objects, (data)=>{successFunction({values: data, file: file})});
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
