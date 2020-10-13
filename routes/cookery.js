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
        const categories = await requestCategoryList();
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
        next(e);
    }
});

router.get('/zipdetail', async function (req, res, next) {

    try {

        const {zipcode, count} = req.query;
        const payload = await requestZipcodeDetail(zipcode);


        res.render('zipdetail/page_root', {
            title: 'Zipcode Detail',
            location_count: count,
            payload: payload
        });
    } catch (e) {

        next(e);
    }
});
router.get('/area', async function (req, res, next) {

    try {
        // const categories = ['chinese', 'mexican', 'japanese', 'fast', 'pizza', 'seafood', 'thai', 'italian', 'korean', 'american', 'sushi bar'];
        const categories = await requestCategoryList();
        const {category, lat, lng, radius} = req.query;
        // console.log(req.query);
        const payload = await requestCookeryArea(category, lat, lng, radius);


        const {lat: ziplat, lng: ziplng, city} = await requestGoogleLatlng(lat, lng);

        res.render('cookery/page_root', {
            title: 'Cookery Map API',
            search_type: 'area',
            ziplat: ziplat,
            ziplng: ziplng,
            categories: categories,
            zipcity: city,
            payload: payload
        });
    } catch (e) {
        next(e);
    }
});

router.get('/reviews', async (req, res, next) => {
    try {
        const {identifier} = req.query;
        const payload = await requestReviewWithIdentifier(identifier);

        res.render('reviews/page_root', {
            title: 'Cookery Map Reviews',
            payload: payload
        });

    } catch (e) {
        next(e);
    }
});

async function requestReviewWithIdentifier(identifier) {
    try {
        return await cookeryConn.coreRequest('GET', ['review', 'all', identifier], {}, {}, {});
    } catch (e) {
        throw e;
    }
}

async function requestCookeryZipcode(category = 'Mexican', zipcode = '89103') {

    try {
        return await cookeryConn.coreRequest('GET', ['count', 'zipcode'], {category, zipcode}, {}, {});
    } catch (e) {
        throw e;
    }
}


async function requestGoogleZip(zipcode = '89103') {
    try {
        return await googleConn.findFormattedAddress(zipcode);
    } catch (e) {
        throw e;
    }
}

async function requestGoogleLatlng(lat = '34.134423', lng = '-117.223234') {
    try {

        return await googleConn.findFormattedAddressWithLatlng(lat, lng);
    } catch (e) {
        throw e;
    }
}

async function requestCookeryArea(category = 'Mexican', lat = '35.334423', lng = '-117.223234', radius = 23) {

    try {
        return await cookeryConn.coreRequest('GET', ['count', 'area'], {category, lat, lng, radius}, {}, {});
    } catch (e) {
        throw e;
    }
}

async function requestCategoryList() {
    try {

        const {categories} = await cookeryConn.coreRequest('GET', ['category', 'all'], {}, {}, {});

        return categories.map(ele => ele.name);
    } catch (e) {
        throw e;
    }
}

async function requestZipcodeDetail(zipcode) {
    try {
        return await cookeryConn.coreRequest('GET', ['zipcode', 'detail', zipcode], {}, {}, {});

    } catch (e) {
        throw e;
    }
}

module.exports = router;