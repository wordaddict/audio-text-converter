const express = require('express');
const app = express();
const router = require('./router/index.js');
const path = require('path');

const port = process.env.PORT || 3010;

app.use('/', router);
app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/', function (req, res) {
    res.render('index')
})
   

//app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/index.html'))
// });

// app.get('/', (req, res) => {
//     res.render(path.join(__dirname + './src/index'));
// });

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});