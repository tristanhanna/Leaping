//clock from stack overflow
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
  $("#climatePage, #navigationPage, #settingsPage, #audioPage").hide();

  $(document).keypress(function(event){
    var keyPressed = event.which || event.keyCode;
    // var keyPressed = event.which;
    if(keyPressed == 49 || keyPressed == 50 || keyPressed == 51 || keyPressed == 52){
      $("main").css("background-image", "url('images/fMotionHomeActive')");
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


  var navigationOn = false;
  var climateOn = false;
  var audioOn = false;
  var settingsOn = false;
  var controllerOptions = new Leap.Controller({enableGestures: true});//setting controller
  var controllerOptions2 = new Leap.Controller({enableGestures: true});//setting controller

  var count = 0;
  var count2 = 0;
  var count3 = 0;

  function navigation(){

    navigationOn = true;
    climateOn = false;
    audioOn = false;
    settingsOn = false;
    $("#climateLogo").attr('src',"images/climate3D");
    $("#audioLogo").attr("src","images/audio3D");
    $("#navigationLogo").attr("src","images/navigationActive");
    $("#settingsLogo").attr("src","images/settings3D");
    $("#navigationPage").show();
    $("#climatePage, #audioPage, #settingsPage").hide();
  }









  function climate(){

    navigationOn = false;
    climateOn = true;
    audioOn = false;
    settingsOn = false;
    $("#climateLogo").attr("src", "images/climateActive");
    $("#audioLogo").attr("src", "images/audio3D");
    $("#navigationLogo").attr("src","images/navigation3D");
    $("#settingsLogo").attr("src", "images/settings3D");
    $("#climatePage").show();
    $("#navigationPage, #audioPage, #settingsPage").hide();
    if(climateOn == true){
      // var count2 = 0;
      // var count3 = 0;
      Leap.loop(controllerOptions2, function(frame) {
      // controllerOptions2.on('frame', function(frame_instance){
      if(climateOn == false){
        controllerOptions2.disconnect();
        return;
      }
        var fan = document.getElementById("fanBar");
        var temp = document.getElementById("tempBar");

        if (frame.hands.length > 0) {

          for (var i = 0; i < frame.hands.length; i++) {

              var hand = frame.hands[i];
              var newClimateV = hand.palmVelocity;//changing volume

              var velocityV = newClimateV[2];
              var velocityH = newClimateV[0];
              velocityV = parseFloat(velocityV);
              velocityH = parseFloat(velocityH);

              // console.log(velocityH);


              if (frame.gestures.length > 0) {
                for (var i = 0; i < frame.gestures.length; i++) {

                  var gesture = frame.gestures[i];

                  if(gesture.type == "swipe") {

                      var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);

                      if(isHorizontal){

                        if(velocityH > 200 && count2 < 100){//function to change fan speed
                          // console.log(velocityH);
                                fan.style.width= count2*3+"px";
                                count2=count2+2;
                                // var newTemp = count/100;
                            }
                        if(velocityH < (-200) && count2 > 0){
                            fan.style.width= count2*3+"px";
                            count2=count2-2;
                            // var newFan = count/100;
                          }
                      }
                      else{
                        var currTemp = Math.ceil((((count3)/100)*(83-58)+58));

                        $("#tempurature").text(currTemp + "° F");

                        if(velocityV > 200 && count3 < 100){//function to change temp
                          console.log(count3);
                                temp.style.height= count3*3+"px";
                                count3=count3+2;
                                // var newTemp = count/100;
                            }
                        if(velocityV < (-200) && count3 > 0){
                            temp.style.height= count3*3+"px";
                            count3=count3-2;
                            // var newFan = count/100;
                          }
                      }
                   }
                 }
              }
            }
        }

      });
      controllerOptions2.connect();

    }

  }










  function audio(){
    navigationOn = false;
    climateOn = false;
    audioOn = true;
    settingsOn = false;
    $("#climateLogo").attr("src","images/climate3D");
    $("#audioLogo").attr("src","images/audioActive");
    $("#navigationLogo").attr("src","images/navigation3D");
    $("#settingsLogo").attr("src", "images/settings3D");
    $("#audioPage").show();
    $("#climatePage, #navigationPage, #settingsPage").hide();
    // $("#volumeBar").toggle(); //need to find a way to untoggle and hide again after a user goes into a different subject, but still keep playing music and have the same volume when they go back into that part of the page
      //This is all just for volume control so we need another type of gesture for pausing or changing the song which shouldn't be too hard
      //leapforward.js had all the different types of data the api gives you
      var songs = [
        {"song": "Hot for Teacher","artist": "Van Halen","source": "../music/VanHalenHotforTeacher.wav"},
        {"song": "Cocaine", "artist": "Eric Clapton", "source": "../music/Cocaine.mp3"},
        {"song": "Girls, Girls, Girls", "artist": "Motle Crue", "source": "../music/Girls,Girls,Girls.mp3"},
        {"song": "Dream On", "artist": "Aerosmith", "source": "../music/DreamOn.mp3"},
        {"song": "Back in Black", "artist": "AC/DC", "source": "../music/BackinBlack.mp3"},
        {"song": "Go Your Own Way", "artist": "Fleetwood Mac", "source": "../music/GoYourOwnWay.mp3"}
      ];


      var sources = ["music/VanHalenHotforTeacher.wav", "music/Cocaine.mp3", "music/Girls,Girls,Girls.mp3", "music/DreamOn.mp3", "music/BackinBlack.mp3", "music/GoYourOwnWay.mp3"];

      var playing = document.getElementById("playing0");
      var playing1 = document.getElementById("playing1");
      var playing2 = document.getElementById("playing2");
      var playing3 = document.getElementById("playing3");
      var playing4 = document.getElementById("playing4");
      var playing5 = document.getElementById("playing5");

      var counter = 0;
    if(audioOn == true){
      function increaseSong(){
        if(counter == 5){
            counter = 0;
          }
          else{
            counter++;
          }
          nextSong();
          return;
        }
      function decreaseSong(){
        if(counter == 0){
          counter = 5;
        }
        else{
          counter--;
        }
        nextSong();
        return;
      }

      function nextSong(){
        $("#title").html(songs[counter].song);
        $("#artist").html(songs[counter].artist);
        if(counter == 0){
          playing1.pause();
          playing.play();
          playing.currentTime = 0;
          playing5.pause();
        }
        else if(counter ==  1){
          playing.pause();
          playing1.play();
          playing1.currentTime = 0;
          playing2.pause();
        }
        else if(counter == 2){
          playing1.pause();
          playing2.play();
          playing2.currentTime = 0;
          playing3.pause();
        }
        else if(counter == 3){
          playing2.pause();
          playing3.play();
          playing3.currentTime = 0;
          playing4.pause();
        }
        else if(counter == 4){
          playing3.pause();
          playing4.play();
          playing4.currentTime = 0;
          playing5.pause();
        }
        else if(counter == 5){
          playing4.pause();
          playing5.play();
          playing5.currentTime = 0;
          playing.pause();
        }
      }


      var paused = false;
      var pauseOnGesture = false;
      // var count = 0;



      // Setup Leap loop with frame callback function

      Leap.loop(controllerOptions, function(frame) {
      // controllerOptions.on('frame', function(frame_instance){
      if(audioOn == false){
        controllerOptions.disconnect();
        return;
      }
        if (paused) {
            return; // Skip this update
        }
        var volume = document.getElementById("volumeBar");

        $("#volume").text(count);
        if (frame.hands.length > 0) {
            for (var i = 0; i < frame.hands.length; i++) {
                var hand = frame.hands[i];
                var newV = hand.palmVelocity;//changing volume

                var velocity = newV[2];
                velocity = parseFloat(velocity);



                if (frame.gestures.length > 0) {
                  for (var i = 0; i < frame.gestures.length; i++) {
                    var gesture = frame.gestures[i];
                    if(gesture.type == "circle") {
                        var newD = gesture.normal;
                        var clockwiseness = newD[2];
                        clockwiseness = parseFloat(clockwiseness);
                        var circlestate = gesture.state;
                        var circleprogress = gesture.progress;
                        var circleradius = gesture.radius;
                        if(clockwiseness < 0 && circlestate == "stop" && circleprogress > 1 && circleradius > 15){
                            increaseSong();
                            
                        }
                        else if(clockwiseness > 0 && circlestate == "stop" && circleprogress > 1 && circleradius > 15){
                            decreaseSong();
                        }
                    }
                }
                }
                




                if(velocity > 1000 && count < 100){//function to change volume
                        volume.style.height= count*3+"px";
                        count=count+2;
                        var newVolume = count/100;

                        if(counter == 0){
                            playing.volume = newVolume;
                        }
                        if(counter == 1){
                            playing1.volume = newVolume;
                        }
                        if(counter == 2){
                            playing2.volume = newVolume;
                        }
                        if(counter == 3){
                            playing3.volume = newVolume;
                        }
                        if(counter == 4){
                            playing4.volume = newVolume;
                        }
                        if(counter == 5){
                            playing5.volume = newVolume;
                        }
                    }

                if(velocity < (-1000) && count > 1){
                        volume.style.height= count*3+"px";
                        count=count-2;
                        var newVolume = count/100;
                        if(counter == 0){
                            playing.volume = newVolume;
                        }
                        if(counter == 1){
                            playing1.volume = newVolume;
                        }
                        if(counter == 2){
                            playing2.volume = newVolume;
                        }
                        if(counter == 3){
                            playing3.volume = newVolume;
                        }
                        if(counter == 4){
                            playing4.volume = newVolume;
                        }
                        if(counter == 5){
                            playing5.volume = newVolume;
                        }
                    }
            }

        }
  });   //END OF LEAP LOOP
  controllerOptions.connect();

    }

  }








  function settings(){
    navigationOn = false;
    climateOn = false;
    audioOn = false;
    settingsOn = true;
    $("#climateLogo").attr("src","images/climate3D");
    $("#audioLogo").attr("src", "images/audio3D");
    $("#navigationLogo").attr("src", "images/navigation3D");
    $("#settingsLogo").attr("src", "images/settingsActive");
    $("#settingsPage").show();
    $("#climatePage, #audioPage, #navigationPage").hide();
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