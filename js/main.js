function init() {
    document.getElementById('loggedOut').style.visibility = 'hidden'; 
    document.getElementById('loggedIn').style.visibility = 'hidden';
document.addEventListener("deviceready", deviceReady, true);
delete init;
}


function checkPreAuth() {
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
    document.getElementById('loggedOut').style.visibility = 'hidden'; 
document.getElementById('loggedIn').style.visibility = 'visible'; 
    }
    else{
document.getElementById('loggedIn').style.visibility = 'hidden';
document.getElementById('loggedOut').style.visibility = 'visible'; 
    }
}

function handleLogin() {
    document.getElementById('loggedOut').style.visibility = 'hidden'; 
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    console.log("click");
    if(u != '' && p!= '') {
        $.post("http://www.mchac.com.au/aktiv/save.php", {username:u,password:p}, function(res) {
            if(res == true) {
                //store
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;             
document.getElementById('loggedIn').style.visibility = 'visible'; 
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
         $("#submitButton").removeAttr("disabled");
        },"json");
    } else {
        //Thanks Igor!
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {
   checkPreAuth(); 
$("#loginForm").on("submit",handleLogin);
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        document.addEventListener("resume", onResume, false);
}

function showAlert() {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  checkPreAuth(); 
  $.mobile.changePage("index.html");
    }
    
    
    function ajaxFunction(){
    var ajaxRequest;  // The variable that makes Ajax possible!

    try{
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
    } catch (e){
        // Internet Explorer Browsers
        try{
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try{
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e){
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }
        }
    }
    // Create a function that will receive data sent from the server
    ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
            var ajaxDisplay = document.getElementById('ajaxDiv');
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
    }
    var age = window.localStorage["username"];
    var queryString = "?age=" + age ;
    ajaxRequest.open("GET", "http://www.mchac.com.au/aktiv/index.php" + queryString, true);
    ajaxRequest.send(null); 
}

  function distance(lat1,lon1,lat2,lon2) {
    var R = 6371; // km (change this constant to get miles)
    var dLat = (lat2-lat1) * Math.PI / 180;
    var dLon = (lon2-lon1) * Math.PI / 180; 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return Math.round(d*1000);
    }


    // onSuccess Geolocation
    //
    var onSuccess = function(position) {
  var lt1 = position.coords.latitude;
  var ln1 = position.coords.longitude;
  var store = distance(lt1,ln1,-27.614617,153.044336);
  var store1 = distance(lt1,ln1,-26.442449,153.039722);
  var store2 = distance(lt1,ln1,-26.375492,152.994704);
	alert(store + ' ' +store1 + ' ' +store2);


};

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }
   function onResume() {
       navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
        function alertDismissed() {
        // do something
    }
