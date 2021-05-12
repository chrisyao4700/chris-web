const express = require('express');
const router = express.Router();
const path = require('path');
const redct = require('../service/redirect.service');
router.use('/', async (req, res, next) => {
    try {
        res.json(await redct.redirect(`${process.env.ANIMAL_SPLIT_URL}${req._parsedUrl._raw}`, req.method, req.body));
    } catch (e) {
        next(e);
    }
});


module.exports = router;