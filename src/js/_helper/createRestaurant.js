

exports.createRestaurantItem = function (Images,restaurant) {
    let li = document.createElement("LI");
    li.className = "media restaurants-row";
    let img = document.createElement("IMG");
    img.className = "align-self-center mr-3";
    let imgSrc = Images(restaurant.imgUrl);
    img.src = `${Images(restaurant.imgUrl)}`;
    img.alt = restaurant.restaurantName;
    let mediaDiv = document.createElement("DIV");
    mediaDiv.className = "media-body";
    let restaurantName = document.createElement("H5");
    restaurantName.textContent = restaurant.restaurantName;
    restaurantName.className = "mt-0 restaurant-title";
    let restaurantDesc = document.createElement("p");
    restaurantDesc.textContent = restaurant.description;
    let reviewButton = document.createElement("BUTTON");
    reviewButton.className = "btn btn-dark mb-3";
    reviewButton.textContent = "Submit Review";
    reviewButton.setAttribute("data-toggle", "modal");
    reviewButton.setAttribute("data-target", "#modal-1");
    reviewButton.setAttribute("data-restaurantId", restaurant.id);

    
// Creating REview Panel to show reviews in a form of list
    let panelDiv = createReviewPanel(restaurant.id);
    // let avgRating = document.createElement("h6");
    // avgRating.textContent = "Total Rating: " + restaurant.avgRating + "/5";
    // avgRating.className = "avgRating";
    mediaDiv.append(restaurantName, restaurantDesc, reviewButton,panelDiv);
    li.append(img,mediaDiv);
    return li;
}

function createReviewPanel(id){
    let panelDiv = document.createElement("div");
    panelDiv.className = 'panel-group';
    let panel = document.createElement("div");
    panel.className = 'panel panel-default';
    let panelHeading = document.createElement("div");
    panelHeading.className = 'panel-heading';
    let panelTitle = document.createElement("h5");
    let panelAnchor = document.createElement("a");
    panelAnchor.setAttribute("data-toggle",'collapse');
    panelAnchor.setAttribute("data-restaurantId",id);
    panelAnchor.setAttribute("href",'#collapse'+id);
    panelAnchor.className = 'review';
    panelAnchor.textContent = 'Show Reviews';
    panelTitle.appendChild(panelAnchor);
    panel.appendChild(panelTitle);

    // Making collapsible list
    let colDiv = document.createElement('div');
    colDiv.setAttribute('id','collapse'+id)
    colDiv.className = 'panel-collapse collapse';
    let ul = document.createElement('ul');
    ul.className = 'list-group';
    ul.setAttribute('id',id)
    colDiv.appendChild(ul);
    panel.appendChild(colDiv)
    // appending all to the panelDiv Container
    panelDiv.appendChild(panel);
    return panelDiv;
}
