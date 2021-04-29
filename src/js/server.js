import path from 'path'
import express from 'express'
import webpack from 'webpack'
const bodyParser = require('body-parser'); 
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import Restaurants from './restaurants.js';
import config from '../../webpack.config.js';


const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html'),
            compiler = webpack(config);

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json()); 
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
  if (err) {
    return next(err)
  }
  res.set('content-type', 'text/html')
  res.send(result)
  res.end()
  })
})

app.post('/restaurants',Restaurants.updateLocalRestaurants);
app.post('/restaurants/review',Restaurants.displayReviews);

const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
