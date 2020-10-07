const express = require('express');
const router = express.Router();
const googleConn = require('../service/google.conn');
const cookeryConn = require('../service/cookery.conn');

router.get('/', async function (req, res, next) {

    try {
        res.redirect('/cookery/zipcode');
    } catch (e) {
        next(e);
    }
});
router.get('/zipcode', async function (req, res, next) {

    try {
        const categories = ['chinese', 'mexican', 'japanese', 'fast', 'pizza', 'seafood', 'thai', 'italian', 'korean', 'american', 'sushi bar'];
        const {category, zipcode} = req.query;
        const payload = await requestCookeryZipcode(category, zipcode);
        const {lat: ziplat, lng: ziplng, city} = await requestGoogleZip(zipcode);

        res.render('cookery/page_root', {
            title: 'Cookery Map API',
            search_type: 'zipcode',
            ziplat: ziplat,
            ziplng: ziplng,
            categories: categories,
            zipcity: city,
            payload: payload
        })
    } catch (e) {
        // console.log(e);
        next(e);
    }
});
router.get('/area', async function (req, res, next) {

    try{
        const categories = ['chinese', 'mexican', 'japanese', 'fast', 'pizza', 'seafood', 'thai', 'italian', 'korean', 'american', 'sushi bar'];
        const {category, lat, lng, radius} = req.query;
        // console.log(req.query);
        const payload = await requestCookeryArea(category, lat, lng, radius);


        const {lat: ziplat, lng: ziplng, city} = await requestGoogleLatlng(lat,lng);


        res.render('cookery/page_root', {
            title: 'Cookery Map API',
            search_type: 'area',
            ziplat: ziplat,
            ziplng: ziplng,
            categories: categories,
            zipcity: city,
            payload: payload
        });
    }catch (e) {
        next(e);
    }
});

async function requestCookeryZipcode(category = 'mexican', zipcode = '90017') {

    try {
        return await cookeryConn.coreRequest('GET', ['count', 'zipcode'], {category, zipcode}, {}, {});
    } catch (e) {
        throw e;
    }
}


async function requestGoogleZip(zipcode = '91709') {
    try {
        return await googleConn.findFormattedAddress(zipcode);
    } catch (e) {
        throw e;
    }
}

async function requestGoogleLatlng(lat = '34.134423', lng='-117.223234') {
    try {

        return await googleConn.findFormattedAddressWithLatlng(lat,lng);
    } catch (e) {
        throw e;
    }
}
async function requestCookeryArea(category = 'mexican', lat = '35.334423', lng = '-117.223234', radius = 23) {

    try {
        return await cookeryConn.coreRequest('GET', ['count', 'area'], {category, lat, lng, radius}, {}, {});
    } catch (e) {
        throw e;
    }
}

module.exports = router;