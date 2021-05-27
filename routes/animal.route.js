const express = require('express');
const router = express.Router();
const path = require('path');

router.get('*', (req, res, next) => {
    // if (!CLIENT_NAME) {
    //     return next('CLIENT NAME IS NOT SPECIFIED')
    // }
    // console.log('?');
    // console.log(req._parsedUrl._raw);
    const file_path = `${__dirname}/../animal-split-frontend/build/index.html`;
    // console.log(file_path);
    res.sendFile(path.resolve(file_path));
});

router.use('/',express.static(path.join(__dirname, `animal-split-frontend/build`)));

module.exports = router;