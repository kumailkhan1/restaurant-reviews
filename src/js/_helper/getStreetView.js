const API_KEY = 'AIzaSyBq-OXavRDO25m8RYw-Xk6GVysTgRRnFDY';

exports.getStreetView = async function (latlng) {
    let URL = "https://maps.googleapis.com/maps/api/streetview?size=300x300&location=" + latlng.lat + ',' + latlng.lng + "&key=" + API_KEY;
    let res = await fetch(URL);
    return res.url;
}

