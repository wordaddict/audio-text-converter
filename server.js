require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const AuthorizationV1 = require('watson-developer-cloud/authorization/v1');
const config = require('./config/config');


const port = process.env.PORT || 3010;

app.set('view engine', 'jsx');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
app.get('/credentials', (req, res, next) => {
    const speechService = new SpeechToTextV1({
        username: config.username,
        password: config.password,
        url: config.url,
      });
    const tokenManager = new AuthorizationV1(speechService.getCredentials());
    tokenManager.getToken((err, token) => {
      if (err) {
        next(err);
      }
        return res.send({token});
    });
  });

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});