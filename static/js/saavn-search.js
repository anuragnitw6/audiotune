//window.localStorage.clear()
const login_btn = document.getElementById("form-open")
const logout_btn = document.getElementById("logout")
const user_id = window.localStorage.getItem("user_id")
const status = window.localStorage.getItem("status")
const track_time = window.localStorage.getItem("track_time")
const email = window.localStorage.getItem("email")
const last_track_id = window.localStorage.getItem("last_track_id")
const name = window.localStorage.getItem("name")
var results_container = document.querySelector("#saavn-results")
const user_name_txt = document.getElementById("user_name")
if(user_id != null){
    user_name_txt.text = name;
    login_btn.style.visibility = "hidden"
    logout_btn.style.visibility = "visible"
}
var results_objects = {};
// const searchUrl = "https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=";
const searchUrl = "https://www.audiotune.co/homepage?locate=locate"
function SaavnSearch() {
event.preventDefault(); // stop page changing to #, which will reload the page
var query = document.querySelector("#saavn-search-box").value.trim()
query = encodeURIComponent(query);

if(query==lastSearch) {doSaavnSearch(query)}
    window.location.hash = lastSearch; 
if(query.length > 0) { 
    window.location.hash = query 
}

}
var page_index = 1;
function nextPage() {
    var query = document.querySelector("#saavn-search-box").value.trim();
    if (!query) {query = lastSearch;}
    query = encodeURIComponent(query);
    doSaavnSearch(query,0,true)
}
async function doSaavnSearch(query,NotScroll,page) {
    window.location.hash = query;
    document.querySelector("#saavn-search-box").value = decodeURIComponent(query);
    if(!query) {return 0;}
results_container.innerHTML = `<span class="loader">Searching</span>`;
    // query=query+"&limit=40";
    // if(page) {
    //     ;page_index=page_index+1;query=query+"&page="+page_index;
    // } else {query=query+"&page=1";page_index=1;}
    
// try catch
try {
var response = await fetch(searchUrl);
} catch(error) {
results_container.innerHTML = `<span class="error">Error: ${error} <br> Check if API is down </span>`;
}
var json = await response.json();
/* If response code isn't 200, display error*/
if (response.status !== 200) {
    results_container.innerHTML = `<span class="error">Error: ${json.message}</span>`;
    console.log(response)
    return 0;
}
var json = json.audio;
// console.log(json)
var results = [];
if(!json) {results_container.innerHTML = "<p> No result found. Try other Library </p>";return;}
lastSearch = decodeURI(window.location.hash.substring(1));
for(let track of json) {

song_name = TextAbstract(track.title,25);
// console.log(song_name)
// album_name = TextAbstract(track.author,20);
// if (track.album.name == track.name) {
//     album_name = ""
// }
// var measuredTime = new Date(null);
// measuredTime.setSeconds(track.length); // specify value of SECONDS
var measuredTime = track.length
// var play_time = measuredTime.toISOString().substr(11, 8);
// if (play_time.startsWith("00:0")) {
//     play_time = play_time.slice(4);
// }
// if (play_time.startsWith("00:")) {
//     play_time = play_time.slice(3);
// }
var song_id = track.parent_id;
var year = track.lang;
var song_image = track.image_url;
// song_image = song_image[':-12'].strip().replace(" ","")
// console.log(song_image)
var song_artist = TextAbstract(track.author,30);
// var bitrate = document.getElementById('saavn-bitrate');
// var bitrate_i = bitrate.options[bitrate.selectedIndex].value;
if(track.link) {
var download_url = track.link;
var quality = "";
// if (bitrate_i == 4) {quality = 320} else {quality = 160;}
    // push object to results array
    results_objects[song_id] = {
        track: track
    };
      results.push(`
      <div class="text-left song-container" style="margin-bottom:20px;border-radius:10px;background-color:#264d76;padding:10px;">
      <div class="row" style="margin:auto;">
          <div class="col-auto" style="padding:10px;border-radius:10px;border-style:none;">
              <img id="${song_id}-i" class="img-fluid d-inline" style="width:95px;border-radius:10px;height:95px;" src="${song_image}"/>
          </div>
          <div class="col" style="border-style:none;padding:2px;">
              <p class="float-right fit-content" style="margin:0px;color:#fff;padding-right:10px;font-size:12px;">${year}</p>
              <p id="${song_id}-n" class="fit-content" style="margin:0px;color:#fff;max-width:100%;font-size:14px;">${song_name}</p>
              <p id="${song_id}-a" class="fit-content" style="margin:0px;color:#fff;max-width:100%;" hidden>${song_name}<br/></p>
              <p id="${song_id}-ar" class="fit-content" style="margin-top:10px;color:#fff;max-width:100%;font-size:14px;">${song_artist}<br/></p>
              <button class="btn btn-primary song-btn" type="button" style="margin:0px 2px;" onclick='PlayAudio("${download_url}","${song_id}","${track.title}")'>▶</button>
              <button class="btn btn-primary song-btn" type="button" style="margin:0px 2px;" onclick='AddDownload("${song_id}")' hidden>DL</button>
              <p class="float-right fit-content" style="margin:0px;color:#fff;padding-right:10px;padding-top:15px;">${measuredTime}<br/></p>
          </div>
      </div>
  </div>
`
); }
    }
    
    results_container.innerHTML = results.join(' ');
    if(!NotScroll){
    document.getElementById("saavn-results").scrollIntoView();
    }


}
function TextAbstract(text, length) {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
}
if(window.location.hash) {
   doSaavnSearch(window.location.hash.substring(1));
} else {doSaavnSearch('english',1);}

addEventListener('hashchange', event => { });
onhashchange = event => {doSaavnSearch(window.location.hash.substring(1))};

// If Bitrate changes, search again
$('#saavn-bitrate').on('change', function () {
    doSaavnSearch(lastSearch);
        /*
    var isDirty = !this.options[this.selectedIndex].defaultSelected;

    if (isDirty) {
        // Value Changed
        doSaavnSearch(lastSearch)
    } else {
        // Do Nothing
    } */
});
// document.getElementById("loadMore").addEventListener('click',nextPage)
function logout() {
    const d = new Date();

    var logout_time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) + ':' + d.getMinutes() + ':' + d.getSeconds();
    console.log(logout_time)
    const body = {
        "user_id":user_id,
        "logout_time":logout_time,
        "track_id":"0",
        "track_time":"0"
    }
    fetch("https://www.audiotune.co/logout", {
    method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)
    })
    .then((response) => response.json())
        .then((json) => {
            console.log(json)
            if (json.message == "Successfully logged out."){
                window.localStorage.clear()

                window.location.href = "https://www.audiotune.co/home";
                login_btn.visibility = "visible"
                logout_btn.style.visibility = "hidden"
                user_name_txt.style.visibility = "hidden"
        }
    });
}