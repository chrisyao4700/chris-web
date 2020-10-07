const opRequest = require("request");
const urlencode = require('urlencode');

const coreRequest = (method, params = {}, query = {}, headers = {}, body = {}) => {
    //URL

    let opCore_url = process.env.perform === 'PRD' ? `http://ec2-54-241-150-145.us-west-1.compute.amazonaws.com/api/v0` : 'http://localhost:4725/api/v0';
    //params
    params.forEach(param => {
        opCore_url += "/" + param;
    });

    //query
    const query_keys = Object.keys(query);
    if (query_keys.length > 0) {
        const query_str = query_keys
            .map(key => {
                return `${key}=${urlencode(query[key], 'UTF-8')}`;
            })
            .join("&");
        opCore_url += `?${query_str}`;
    }

    //request
    const options = {method, url: opCore_url, body, headers, json: true};

    return new Promise((resolve, reject) => {
        opRequest(options, (err, response, body) => {
            if (!err) {
                if (body.status === true) {
                    resolve(body.payload ? body.payload : {});
                } else {
                    reject(body.message);
                }
            } else {
                if (err) reject(err);
                else {
                    if (body) {
                        reject(
                            new Error(body.message ? "ERROR FROM CORE - " + body.message : "UNKNOWN ERROR FROM CORE - " + opCore_url)
                        );
                    } else {
                        reject(new Error(" UNKNOWN ERROR FROM CORE - " + opCore_url));
                    }
                }
            }
        });
    });
};

module.exports.coreRequest = coreRequest;