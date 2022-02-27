require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const isUrl = require('is-url');

// Basic Configuration
const port = process.env.PORT || 3000;
let count = 0;
const urlsShort = {};
app.use(cors());

app.use(bodyParser.urlencoded({ 
  extended: false 
}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:short_url', function(req, res) {
  const url = req.params.short_url;
  const data = urlsShort[url];
  res.redirect(data);
});

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  if(!isUrl(url)){
    res.json({ error: 'invalid url' })
  }else{
    count += 1;
    urlsShort[count] = url; 
    res.status(200).json({
      original_url: url,
      short_url: count
    })
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
