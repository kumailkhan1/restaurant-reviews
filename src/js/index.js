import "./../css/styles.css";
import "./../css/review.css";
import restaurants from '../restaurants.json';
import { createRestaurantItem } from "./_helper/createRestaurant";
import { getStreetView } from "./_helper/getStreetView";
import { getRestaurants, createGoogleRestaurant } from "./_helper/getRestaurants"
import { showReview } from "./_helper/showReview"
const Images = require.context('./../images', true);


var AllRestaurantsMarkersLayer = new L.LayerGroup();
var mymap;
var bounds;
var googleRestaurants;


navigator.geolocation.getCurrentPosition(function (location) {
  var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
  mymap = L.map('map').setView(latlng, 13)
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1Ijoic2hhcnAwMDciLCJhIjoiY2toYTY3Y2g5MGNiMTJ0dGl6ZmVmZnh4NCJ9.-jAhUA3jpquXEpBdg71QFA'
  }).addTo(mymap);

  var marker = L.marker(latlng).addTo(mymap);
  marker.bindPopup("This is me!")
  bounds = mymap.getBounds();
  // call Google Search API
  getRestaurants(bounds.getCenter()).then(results => {
    console.log(results);
    googleRestaurants = results;
    filter(0, 5, restaurants)
  })


  const el = document.getElementById('addRestaurantBtn');

  mymap.on('zoomend', function (e) {

    bounds = mymap.getBounds();
    // call Google Search API
    getRestaurants(bounds.getCenter()).then(results => {
      googleRestaurants = results;
      filter(0, 5, restaurants)
    })

  });
  mymap.on('moveend', function (e) {

    bounds = mymap.getBounds();
    // call Google Search API
    getRestaurants(bounds.getCenter()).then(results => {
      googleRestaurants = results;
      filter(0, 5, restaurants)
    })

  });
  // Adding event listener on right click
  mymap.on('contextmenu', function (e) {
    let latlng = [];
    latlng[0] = e.latlng.lat;
    latlng[1] = e.latlng.lng;
    el.setAttribute("data-latlng", latlng)
    $("#modal-2").modal('show');

  });

  el.addEventListener('click', addLocalRestaurant, false);
});

function addLocalRestaurant() {
  let el = document.getElementById('addRestaurantBtn');
  let latlng = el.getAttribute('data-latlng').split(',');
  let rName = document.getElementById("rName");
  let rDesc = document.getElementById("rDesc");
  let rAddress = document.getElementById("rAddress");


  let restaurantObj = {
    "restaurantName": rName.value,
    "description": rDesc.value,
    "address": rAddress.value,
    "lat": parseFloat(latlng[0]),
    "long": parseFloat(latlng[1]),
    "avgRating": 0,
    "imgUrl": "./rest1.jpeg",
    "ratings": []
  }

  let arr;
  if (sessionStorage.getItem('LocalRestaurants') === null) {

    arr = [];
    arr.push(restaurantObj);
    sessionStorage.setItem('LocalRestaurants', JSON.stringify(arr))
  }
  else {

    arr = [];
    let prevObject = JSON.parse(sessionStorage.getItem('LocalRestaurants'));
    for (let i = 0; i < prevObject.length; i++) {
      arr.push(prevObject[i]);
    }
    arr.push(restaurantObj);
    sessionStorage.setItem('LocalRestaurants', JSON.stringify(arr))
  }

  rName.value = '';
  rDesc.value = '';
  rAddress.value = '';
  filter(0, 5, restaurants)
  $("#modal-2").modal('hide');

}



// ADD REVIEW MODAL WINDOW
$("#modal-1").on("show.bs.modal", function (event) {
  // which button was clicked, getting data-restaurantid attribute from it
  let button = $(event.relatedTarget);
  let restaurantID = button.data("restaurantid");

  const btn = document.querySelector("#reviewButton");
  const post = document.querySelector(".post");
  const widget = document.querySelector(".star-widget");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    widget.style.display = "none";
    post.style.display = "block";
    //   Getting rating and review values
    let rating = document.querySelector('input[name="rate"]:checked').value;
    let review = document.querySelector('#customerReview').value;
    // AJAX Call - POST to Server.js at localhost:8081/restaurants

    fetch('http://localhost:8081/restaurants', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'id': restaurantID,
        'rating': rating,
        'review': review
      })
    }).then(function (data) {
      console.log("Successful request:", data);
    }).catch(function (error) {
      console.log("Request Failed:", error);
    })
    console.log("Data Sent!");

    return false;
  });

  $("#modal-1").on('hidden.bs.modal', function () {
    const post = document.querySelector(".post");
    const widget = document.querySelector(".star-widget");
    let review = document.querySelector('#customerReview')
    widget.style.display = "block";
    post.style.display = "none";
    review.value = "";
    let radioRate = document.getElementsByName("rate");
    for (var i = 0; i < radioRate.length; i++) {
      radioRate[i].checked = false;
    }


  });


});

function filter(min = 0, max = 5, restaurants) {
  let restaurantsDOM = document.getElementById('restaurants-list');
  restaurantsDOM.textContent = "";
  AllRestaurantsMarkersLayer.clearLayers();
  updateRestaurants(min, max, restaurants);
  if (JSON.parse(sessionStorage.getItem('LocalRestaurants')) !== null) {
    updateRestaurants(min, max, JSON.parse(sessionStorage.getItem('LocalRestaurants')))
  }
  // getting restaurants from google search api
  updateRestaurants(min, max, googleRestaurants, true)

}

function updateRestaurants(min, max, restaurants, google = false) {
  let restaurantsDOM = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    if (restaurant.avgRating >= min && restaurant.avgRating <= max) {
      // Only show those which are in map bounds
      let markerLatLng = [restaurant.lat, restaurant.long]
      if (mymap.getBounds().contains(markerLatLng)) {
        let li;
        if (!google) {
          li = createRestaurantItem(Images, restaurant)
        }
        else {
          li = createGoogleRestaurant(restaurant)
        }

        restaurantsDOM.appendChild(li);
        let divider = document.createElement("hr");
        restaurantsDOM.appendChild(divider)
        // If its not locally added restaurant
        let marker = L.marker([restaurant.lat, restaurant.long]).bindPopup("", { maxWidth: "auto" });
        // Get a Google Street View API Image at the lat long 
        let rName = restaurant.restaurantName
        marker.rName = rName;
        marker.on('click', markerOnClick);


        AllRestaurantsMarkersLayer.addLayer(marker);
      }

    }
    AllRestaurantsMarkersLayer.addTo(mymap)
  });
}

function markerOnClick(e) {
  let latlng = e.latlng;
  getStreetView(latlng).then(url => {
    console.log(url);
    let img = url;
    this.setPopupContent(`${this.rName}<br><img src=${img}>`)
  });
}

// DISPLAYING REVIEWS 
document.getElementById('restaurants-list').addEventListener('click', function (e) {
  showReview(e);
});

// When filter button is pressed
document.getElementById('filterBtn').addEventListener('click', function () {
  let min = parseInt(document.getElementById('minRating').value);
  let max = parseInt(document.getElementById('maxRating').value);
  filter(min, max, restaurants)
}, false);
