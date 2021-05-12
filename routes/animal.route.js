const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/', (req, res, next) => {
    // if (!CLIENT_NAME) {
    //     return next('CLIENT NAME IS NOT SPECIFIED')
    // }
    // console.log('?');
    const file_path = `${__dirname}/../../animal-split-frontend/build/index.html`;
    res.sendFile(path.join(file_path));
});

router.use('/', express.static(path.join(`${__dirname}/../../animal-split-frontend/build`)));


module.exports = router;