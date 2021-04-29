const API_KEY = 'AIzaSyBq-OXavRDO25m8RYw-Xk6GVysTgRRnFDY';

exports.getRestaurants = async function (bounds) {
    let URL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=" + bounds.lat + "," + bounds.lng + "&radius=3000" + "&key=" + API_KEY;
    console.log(URL);
    let rest = await fetch(URL, {
        method: 'get',
        headers: {
            Accept: "application/json",
            Origin: "https://google.com",
        },
    }).then(res => { return res.json() })
        .then(data => {
            return data.results;
        })
        .catch(err => console.log(err))

    let restaurants = rest.map(restaurant => {
        return {
            "restaurantName": restaurant.name,
            "address": restaurant.formatted_address,
            "lat": restaurant.geometry.location.lat,
            "long": restaurant.geometry.location.lng,
            "avgRating": restaurant.rating,
            "photo": restaurant.icon
        }

    })
    return restaurants;
}
exports.createGoogleRestaurant = function (restaurant) {
    let li = document.createElement("LI");
    li.className = "media restaurants-row";

    let img = document.createElement("IMG");
    img.className = "align-self-center mr-3";
    
    getImage(restaurant.lat, restaurant.long).then(url => {
        img.src= url;
    })


    let mediaDiv = document.createElement("DIV");
    mediaDiv.className = "media-body";
    let restaurantName = document.createElement("H5");
    restaurantName.textContent = restaurant.restaurantName;
    restaurantName.className = "mt-0 restaurant-title";
    let restaurantDesc = document.createElement("p");
    restaurantDesc.textContent = restaurant.address;

    mediaDiv.append(restaurantName, restaurantDesc);
    li.append(img,mediaDiv);
    return li;
}

async function getImage(lat, long) {
    let URL = "https://maps.googleapis.com/maps/api/streetview?size=300x300&location=" + lat + ',' + long + "&key=" + API_KEY;
    let res = await fetch(URL);
    return res.url;
}

