const express = require('express');
const router = express.Router();
const path = require('path');
const redct = require('../service/redirect.service');
router.get('/', (req, res, next) => {
    // if (!CLIENT_NAME) {
    //     return next('CLIENT NAME IS NOT SPECIFIED')
    // }
    // console.log('?');
    const file_path = `${__dirname}/../../animal-split-frontend/build/index.html`;
    res.sendFile(path.join(file_path));
});

router.use('/', express.static(path.join(`${__dirname}/../../animal-split-frontend/build`)));
router.use('/api', async (req, res, next) => {
    try {

        // console.log('http://localhost:9678/api'+req._parsedURL);
        // console.log(req._parsedUrl._raw, req.method, req.body);
        res.json(await redct.redirect(`${process.env.ANIMAL_SPLIT_URL}${req._parsedUrl._raw}`, req.method, req.body));
    } catch (e) {
        next(e);
    }
});

module.exports = router;