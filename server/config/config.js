require('dotenv').config();

const config = {
    apiUrl: process.env.APIURL,
    apiAuth: process.env.APIAUTH,
    url: process.env.URL,
    username: process.envSPEECH_TO_TEXT_USERNAME,
    password: process.env.SPEECH_TO_TEXT_PASSWORD
};

module.exports = config;