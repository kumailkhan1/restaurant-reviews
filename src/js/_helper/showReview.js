exports.showReview = function (e) {
    let arr;
    console.log(e);
    if (e.target && e.target.matches('a.review')) {
      let restaurantID = parseInt(e.target.getAttribute('data-restaurantId'));
      let ul = document.getElementById(restaurantID);
      fetch('http://localhost:8081/restaurants/review', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          'id': restaurantID
        })
      }).then(function (res) {
        return res.json();
      }).then(data => {
        arr = data;
        ul.textContent = '';
        arr.forEach(el => {
          let li = document.createElement('li');
          li.className = 'list-group-item';
          li.textContent = el.comment;
          ul.appendChild(li)
        })
        console.log(data);
      })
        .catch(err => {
          console.log("Request Failed:" + err);
        })
  
      console.log("Data Sent!");
  
      return false;
    }
}