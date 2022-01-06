const axios = require("axios");

const API = axios.create({
    baseURL: "https://api.data.gov.sg/v1"
});

module.exports = API;