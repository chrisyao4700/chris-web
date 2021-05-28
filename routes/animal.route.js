const express = require('express');
const router = express.Router();
const path = require('path');

router.get('*', (req, res, next) => {

    const file_path = `${__dirname}/../animal-split-frontend/build/index.html`;

    // console.log(req._parsedUrl._raw);

    res.sendFile(path.resolve(file_path));
});



module.exports = router;
