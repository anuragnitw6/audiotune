document.getElementById("sendOtpLink").addEventListener('click', sendOtp)
const x = document.getElementById("snackbar")

 function sendOtp() {
     const name  = document.getElementById("name");
     const email = document.getElementById("email");
     const d = new Date();
     var login_time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) + ':' + d.getMinutes() + ':' + d.getSeconds();

     const data= {
         "name":name.value,
         "email":email.value,
         "login_time":login_time
     }
     fetch("https://www.audiotune.co/user-detail", {
     method: "POST",
     headers: {
         "Content-type": "application/json; charset=UTF-8"
     },
     body: JSON.stringify(data)
     })
     .then((response) => response.json())
         .then((json) => {
             console.log(json)
         if (json.message == "user already exist") {
             x.className = "show";
             setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
         }
         else {
             document.getElementById("verifyOtp").addEventListener('click', function () {
                 const otp = document.getElementById("otp");
                 console.log(otp.value)
                 if (otp.value == json.otp) {
                     // console.log("Login successfull")
                     window.location.href = "https://www.audiotune.co/home";
                     window.localStorage.setItem("user_id", json.user_id);
                     window.localStorage.setItem("status", json.status);
                     window.localStorage.setItem("name", json.name);
                     window.localStorage.setItem("last_track_id", json.last_track_id);
                     window.localStorage.setItem("email", json.email);
                     window.localStorage.setItem("track_time", json.track_time);
                 }
             })
         }
     });

 }
