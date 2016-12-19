const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const app = express();

const webpackConfig = require('../../src/web/webpack.config');

const compiler = webpack(webpackConfig);
const middleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  silent: true
});

app.use(bodyParser.json());
app.use(middleware);
app.use(webpackHotMiddleware(compiler));

const fs = middleware.fileSystem;

const urls = [];

app.post('/api/shorten_url', (req, res) => {
  const longUrl = req.body.url;
  const shortUrl = `${req.protocol}://${req.get('host')}/${shortid.generate()}`;
  urls.push({
    shortUrl,
    longUrl
  });
  res.send({ shortUrl });
});

app.get('*', (req, res) => {
  const shortUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const matchingUrl = urls.find((url) => url.shortUrl === shortUrl);

  if (matchingUrl) {
    res.redirect(matchingUrl.longUrl);
  } else {
    res.sendStatus(404);
  }
});

app.get('/', (req, res) => {
  fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
});

app.listen(3000);
