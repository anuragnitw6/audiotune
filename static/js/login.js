
document.getElementById("sendOtpLinkForLogin").addEventListener('click', sendLoginOtp)
const x = document.getElementById("snackbar");
function sendLoginOtp() {
    const email = document.getElementById("email");
    // var dateFormat = require('dateformat');
    var d = new Date();
    // var login_time = now.getFullYear() +" "+ now.getMonth() +" "+ now.getDate() +" " + now.getHours() +" "+ now.getMinutes() +" "+now.getSeconds()
    // var login_time = now.toLocaleDateString();
    var login_time = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+(d.getHours() > 12 ? d.getHours() - 12 : d.getHours())+':'+d.getMinutes()+':'+d.getSeconds();
    console.log(login_time)
    const data= {
        "email":email.value,
        "login_time":login_time
    }
    fetch("https://www.audiotune.co/user-detail?email=" +email.value+"&login_time="+login_time, {
    method: "GET",
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    // body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
        if (json.message == "You are already logged in to other device") {
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

        }
        document.getElementById("verifyOtpLogin").addEventListener('click',function() {
            const otp = document.getElementById("otp");
            console.log(otp.value)
            if(otp.value == json.otp){
                console.log("Login successfull")
                window.location.href = "https://www.audiotune.co/home";
                window.localStorage.setItem("user_id",json.user_id);
                window.localStorage.setItem("status",json.status);
                window.localStorage.setItem("name",json.name);
                window.localStorage.setItem("last_track_id",json.last_track_id);
                window.localStorage.setItem("email",json.email);
                window.localStorage.setItem("track_time",json.track_time);
            }
        })        
    });

}