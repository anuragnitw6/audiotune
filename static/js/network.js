// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
     // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
// Example POST method implementation:
async function getRestaurantItem(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
     // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData("http://127.0.0.1:5000/homepage?locate=locate").then((data) => {
 // console.log(data['rest'][0]); // JSON data parsed by `data.json()` call
  rest_data = data['rest']; 
  
  // const rest = document.querySelector(".restaurant");
  const rest_detail = document.querySelector(".restaurant-detail");
  rest_data.forEach(element => {
    const thumb_img = document.createElement('img');
    thumb_img.src = '../static/images/menu1.jpg';
    thumb_img.style.borderRadius = '12px';
    thumb_img.style.width = '220px';
    thumb_img.style.height = 'auto';
    thumb_img.style.padding = '8px';
    const div = document.createElement('div');
    div.id = element['rst_id'];
    div.classList.add('rest-name');
    div.style.width = '250px';
    div.style.height = 'auto';
    const h3 = document.createElement('h6');
    h3.textContent = element['name'];
    h3.style.paddingLeft = '16px';
    h3.style.font = 'sans-sarif';
    const rate = document.createElement('div');
    rate.style.display = 'flex';
    const p1 = document.createElement('p');
    p1.textContent = element['rating'];
    p1.style.fontSize = '12px';
    p1.style.width = '36px';
    p1.style.fontWeight = '500';
    p1.style.fontFamily = 'helvetica,sans-sarif';
    p1.style.marginLeft = '84px';
    p1.style.textAlign = 'center';
    p1.style.borderRadius = '6px';
    p1.style.color = '#FFFFFF';
    p1.style.background = '#28a745';
    const p2 = document.createElement('p');
    p2.style.fontSize = '14px';
    // p2.style.width = 'auto';
    p2.style.paddingLeft = '16px';
    p2.style.flex = '0 0 33.33333%';
    // p2.style.wordBreak = 'break-word';
    p2.style.whiteSpace = 'nowrap';
    p2.style.overflow = 'hidden';
    p2.style.textOverflow = 'ellipsis';
    p2.textContent = element['key'];
    rate.appendChild(p2);
    rate.appendChild(p1);
    div.appendChild(thumb_img);
    div.appendChild(h3);
    div.appendChild(rate);
    rest_detail.appendChild(div);
  });
  rest_detail.onclick = addClickEventsToGridItems;
  function addClickEventsToGridItems(e) {
    
    var elm = e.target;
    var clickId = elm.parentNode['id'];
    getItems(clickId);
    // console.log(elm.parentNode['id']);
    // console.log(elm.parentNode);
  }
  
});
function getItems(clickId) {

  getRestaurantItem("http://127.0.0.1:5000/items?rst_id="+clickId).then((data) => {
    window.onload('item.html');
    rst_data = data['items'];
    console.log(rst_data);
  });  
}
