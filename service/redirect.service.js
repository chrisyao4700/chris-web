const axios = require('axios');
const redirect = async (path, method, body) => {
    const {data} = await axios({method, url: path, data: body});
    return data;

};

module.exports = {redirect};