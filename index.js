'use strict';
const Express = require('express');
const config  = require('config');
const bodyParser = require('body-parser');

const app = Express();
const port = process.env.PORT || 3000;


// Setting default port
app.set('port', port);

// Setting server configurations
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
});

app.listen(app.get('port'), err => {
  if (err)
    return console.log(`Server error: ${err}`);

  console.log(`Server up, port: ${port}`);
});
