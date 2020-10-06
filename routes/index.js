const express = require('express');
const router = express.Router();
const skillConn = require('../modules/skills/skills.js');

const cookeryConn = require('../service/cookery.conn');

/* GET home page. */
router.get('/', function (req, res, next) {
    let skillList = skillConn.getSkillList();
    res.render('home/page_root', {
        title: 'Chris Yao',
        skillList: skillList
    });
});
router.get('/cookery/count', async function (req, res, next) {

    const categories = ['chinese', 'mexican', 'japanese', 'fast', 'pizza', 'seafood', 'thai', 'italian', 'korean', 'american', 'sushi bar'];
    const payload = await cookeryConn.coreRequest('GET', ['count'], req.query, {}, {});
    res.render('cookery/page_root', {
        title: 'Cookery Map API',
        type: 'count',
        categories: categories,
        payload: payload
    })
});
router.get('/cookery/area', async function (req, res, next) {

    const categories = ['chinese', 'mexican', 'japanese', 'fast', 'pizza', 'seafood', 'thai', 'italian', 'korean', 'american', 'sushi bar'];
    const payload = await cookeryConn.coreRequest('GET', ['area'], req.query, {}, {});
    res.render('cookery/page_root', {
        title: 'Cookery Map API',
        type: 'area',
        categories: categories,
        payload: payload
    });
});
module.exports = router;
