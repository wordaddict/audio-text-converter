require('dotenv').config();

const express = require('express');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const AuthorizationV1 = require('watson-developer-cloud/authorization/v1');
const IamTokenManagerV1 = require('watson-developer-cloud/iam-token-manager/v1');
const router = express.Router();

const speechService = new SpeechToTextV1({
    username: 'f79ab83b-1938-4e8e-bd0f-fb14cad0a63a',
    password: 'wuf2YOsBzyWv',
    url: 'https://stream.watsonplatform.net/speech-to-text/api',
  });
tokenManager = new AuthorizationV1(speechService.getCredentials());
tokenManager.getToken((err, token) => {
  console.log('token', token);
  console.log('err', err);
});

router.get('/', (req, res) => {
    res.send('WE ARE LIVE!');
});

router.get('/api/credentials', (req, res, next) => {
    tokenManager.getToken((err, token) => {
      if (err) {
        next(err);
      } else {
        let credentials;
        if (instanceType === 'iam') {
          credentials = {
            accessToken: token,
            serviceUrl,
          };
        } else {
          credentials = {
            token,
            serviceUrl,
          };
        }
        res.json(credentials);
      }
    });
  });

  //  <textarea id="textarea" rows="4" cols="50" value={this.getTranscript(messages)} />

module.exports = router;