require('dotenv').config();

const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const AuthorizationV1 = require('watson-developer-cloud/authorization/v1');

const Token = () => {
    const speechService = new SpeechToTextV1({
        username: 'f79ab83b-1938-4e8e-bd0f-fb14cad0a63a',
        password: 'wuf2YOsBzyWv',
        url: 'https://stream.watsonplatform.net/speech-to-text/api',
      });
    let tokenManager = new AuthorizationV1(speechService.getCredentials());
    tokenManager.getToken((err, token) => {
      console.log('token', token);
      console.log('err', err);
    });
}

module.exports = Token;