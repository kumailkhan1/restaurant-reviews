
const fs = require('fs')
const path = require('path');
const restaurantsURL = './../src/restaurants.json';
let rawdata = fs.readFileSync(path.resolve(__dirname, restaurantsURL));
let restaurants = JSON.parse(rawdata);

exports.updateLocalRestaurants = function (req, res) {

  let sum = 0;

  restaurants.forEach(restaurant => {
    if (req.body.id === restaurant.id) {
      //   get the ratings array and adding the new rating and review to it also recalculating avg

      restaurant.ratings.push({
        "stars": parseInt(req.body.rating),
        "comment": req.body.review
      });
      restaurant.ratings.forEach(el => {
        sum += el.stars;
      })
      let avg = restaurant.avgRating;
      avg = (sum / restaurant.ratings.length)
      restaurant.avgRating = avg;
    }
  });
  fs.writeFileSync(path.resolve(__dirname, restaurantsURL), JSON.stringify(restaurants));
  res.end();
}

exports.displayReviews = function (req, res) {
  restaurants.forEach(restaurant => {
    if (req.body.id === restaurant.id) {
      
      console.log(restaurant.ratings);
      res.send(restaurant.ratings);

    }
  });
}