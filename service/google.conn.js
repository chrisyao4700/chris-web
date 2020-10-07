const opRequest = require("request");

const searchZipcode = (zipcode) => {



    const googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBYG560jy9oXUHCzzeC3JOMpdRrcU43T9U" +
        `&address=${zipcode}`;

    const options = {method: 'GET', url: googleUrl, body: {}, headers: {}, json: true};
    console.log(options);
    return new Promise((resolve, reject) => {
        opRequest(options, (err, response, body) => {
            console.log(body);
            if (!err) {
                if (body.status === "OK") {
                    resolve(body.results[0] ? body.results[0] : {});
                } else {
                    reject(body.message);
                }
            } else {
                if (err) reject(err);
                else {
                    if (body) {
                        reject(
                            new Error(body.message ? "ERROR FROM GOOGLE - " + body.message : "UNKNOWN ERROR FROM GOOGLE - " + googleUrl)
                        );
                    } else {
                        reject(new Error(" UNKNOWN ERROR FROM GOOGLE - " + googleUrl));
                    }
                }
            }
        });
    });

};

module.exports.searchZipcode = searchZipcode;