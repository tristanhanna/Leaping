
// got clock function from https://stackoverflow.com/questions/28415178/how-do-you-show-the-current-time-on-a-web-page
(function () {
  var clockElement = document.getElementById( "clock" );
  function updateClock ( clock ) {
    clock.innerHTML = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
  setInterval(function () {
      updateClock( clockElement );
  }, 1000);
}());

$(document).ready(function(){
    $("#volumeBar").hide();
  $(document).keypress(function(event){
    var keyPressed = event.which || event.keyCode;
    // var keyPressed = event.which;
    if(keyPressed == 49 || keyPressed == 50 || keyPressed == 51 || keyPressed == 52){
      $("main").css("background-image", "none");
      $(".center").hide();
      if(keyPressed == 49){
        navigation();
      }
      else if(keyPressed == 50){
        climate();
      }
      else if(keyPressed == 51){
        audio();
      }
      else if(keyPressed == 52){
        settings();
      }
    }
    console.log(keyPressed);

  });


  function navigation(){
    $("#climateLogo").attr('src',"images/climate3D");
    $("#audioLogo").attr("src","images/audio3D");
    $("#navigationLogo").attr("src","images/navigationActive");
    $("#settingsLogo").attr("src","images/settings3D");
  }
  function climate(){
    $("#climateLogo").attr("src", "images/climateActive");
    $("#audioLogo").attr("src", "images/audio3D");
    $("#navigationLogo").attr("src","images/navigation3D");
    $("#settingsLogo").attr("src", "images/settings3D");
  }
  function audio(){
    $("#climateLogo").attr("src","images/climate3D");
    $("#audioLogo").attr("src","images/audioActive");
    $("#navigationLogo").attr("src","images/navigation3D");
    $("#settingsLogo").attr("src", "images/settings3D");
    $("#volumeBar").toggle(); //need to find a way to untoggle and hide again after a user goes into a different subject, but still keep playing music and have the same volume when they go back into that part of the page
      //This is all just for volume control so we need another type of gesture for pausing or changing the song which shouldn't be too hard
      //leapforward.js had all the different types of data the api gives you
      var playing = document.getElementById("playing");
        playing.play();
      var paused = false;
      //var pauseOnGesture = false;
      var count=1;
      // Setup Leap loop with frame callback function
      var controllerOptions = {enableGestures: true};

      Leap.loop(controllerOptions, function(frame) {
        if (paused) {
            return; // Skip this update
        }
    
        var volume = document.getElementById("volumeBar");
    
        if (frame.hands.length > 0) {
            for (var i = 0; i < frame.hands.length; i++) {
                var hand = frame.hands[i];
                var newV = hand.palmVelocity;
                var velocity = newV[0];
                velocity = parseFloat(velocity);
            
                if(velocity > 1500 && count < 1000){
                        volume.style.width= count+20+"px";
                        count=count+20;
                        var newVolume = count/1000;
                        playing.volume = newVolume;
                    }
              
                if(velocity < (-1500) && count > 1){
                        volume.style.width= count-20+"px";
                        count=count-20;
                        var newVolume = count/1000;
                        playing.volume = newVolume;
                    }
            
            }
        }
      })   //END OF LEAP LOOP
  }
  function settings(){
    $("#climateLogo").attr("src","images/climate3D");
    $("#audioLogo").attr("src", "images/audio3D");
    $("#navigationLogo").attr("src", "images/navigation3D");
    $("#settingsLogo").attr("src", "images/settingsActive");
  }
});

//NOT USING MOST OF THESE FUNCTIONS
function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
             + vector[1].toFixed(digits) + ", "
             + vector[2].toFixed(digits) + ")";
}

function togglePause() {
  paused = !paused;

  if (paused) {
    document.getElementById("pause").innerText = "Resume";
  } else {
    document.getElementById("pause").innerText = "Pause";
  }
}

function pauseForGestures() {
  if (document.getElementById("pauseOnGesture").checked) {
    pauseOnGesture = true;
  } else {
    pauseOnGesture = false;
  }
}

function proportion(value,max,minrange,maxrange) {
    return Math.round(((max-value)/(max))*(maxrange-minrange))+minrange;
}

function checkLibrary() {
  if (typeof Leap === "undefined") {
    document.getElementById("main").innerHTML = "The Leap Motion JavaScript client library (leap.js file) was not found. Please download the library from the GitHub project at <a href='https://github.com/leapmotion/leapjs'>https://github.com/leapmotion/leapjs</a>."
    alert("The Leap Motion JavaScript client library (leap.js file) was not found. Please download the latest version from the GitHub project at https://github.com/leapmotion/leapjs");
  }
}