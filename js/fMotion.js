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
  $("#climatePage, #navigationPage, #settingsPage, #audioPage, #brightnessPage, #audioSettingsPage, #clockSettingsPage").hide();

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
    // console.log(keyPressed);

  });


  var navigationOn = false;
  var climateOn = false;
  var audioOn = false;
  var settingsOn = false;
  var bassTrebleOn = false;
  var brightnessOn = false;
  var clockOn = false;
  var controllerOptionsNavigation = new Leap.Controller({enableGestures:true});//setting controller
  var controllerOptionsAudio = new Leap.Controller({enableGestures: true});//setting controller
  var controllerOptionsClimate = new Leap.Controller({enableGestures: true});//setting controller
  var controllerOptionsSettings = new Leap.Controller({enableGestures: true});//setting controller
  var controllerOptionsBrightness = new Leap.Controller({enableGestures: true});//setting controller
  var controllerOptionsBassTreble = new Leap.Controller({enableGestures: true});//setting controller
  var controllerOptionsClock = new Leap.Controller({enableGestures: true});//setting controller

  var count = 0;
  var count2 = 0;
  var count3 = 0;
  var count4 = 0;
  var count5 = 0;
  var count6 = 100;
  var settingsCount = 0;

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
    var theZoom = 10;
    var locationRio = {lat: 40.007718, lng: -105.269740};
    var map = new google.maps.Map(document.getElementById("navigationMap"), {
          zoom: theZoom,
          center: locationRio,
          gestureHandling: 'none'
    });
    
    if(navigationOn == true){
      
      Leap.loop(controllerOptionsNavigation, function(frame) {

      if(navigationOn == false){
        controllerOptionsNavigation.disconnect();
        return;
      }

        if (frame.hands.length > 0) {

          for (var i = 0; i < frame.hands.length; i++) {

              var hand = frame.hands[i];
              var newV = hand.palmVelocity;

              //var velocityV = newV[2];
              var velocityH = newV[0];
              //velocityV = parseFloat(velocityV);
              velocityH = parseFloat(velocityH);
              
              if(velocityH > 700 && theZoom < 20){
                  theZoom = theZoom + .2;
                  map.setZoom(theZoom);
              }
              if(velocityH > (-700) && theZoom < 1){
                  theZoom = theZoom - .2;
                  map.setZoom(theZoom);
              }
            }
        }

      });
      controllerOptionsNavigation.connect();

    }

  }

  function climate(){

    navigationOn = false;
    climateOn = true;
    audioOn = false;
    settingsOn = false;
    bassTrebleOn = false;
    brightnessOn = false;
    clockOn = false;
    $("#climateLogo").attr("src", "images/climateActive");
    $("#audioLogo").attr("src", "images/audio3D");
    $("#navigationLogo").attr("src","images/navigation3D");
    $("#settingsLogo").attr("src", "images/settings3D");
    $("#climatePage").show();
    $("#navigationPage, #audioPage, #settingsPage, #brightnessPage, #audioSettingsPage, #clockSettingsPage").hide();
    if(climateOn == true){
      Leap.loop(controllerOptionsClimate, function(frame) {
      if(climateOn == false){
        controllerOptionsClimate.disconnect();
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
                            fan.style.width= count2*3+"px";
                            count2=count2+2;
                            $("#fanImg").css({'transform': 'rotate(180deg)'});
                            }
                        if(velocityH < (-200) && count2 > 0){
                            fan.style.width= count2*3+"px";
                            count2=count2-2;
                            $("#fanImg").css({'transform': 'rotate(180deg)'});
                          }
                      }
                      else{
                        var currTemp = Math.ceil((((count3)/100)*(83-58)+58));
                        $("#tempurature").text(currTemp + "° F");
                        if(velocityV > 200 && count3 < 100){//function to change temp
                          console.log(count3);
                                temp.style.height= count3*3+"px";
                                count3=count3+2;
                            }
                        if(velocityV < (-200) && count3 > 0){
                            temp.style.height= count3*3+"px";
                            count3=count3-2;
                          }
                      }
                   }
                 }
              }
            }
        }

      });
      controllerOptionsClimate.connect();

    }

  }










  function audio(){
    navigationOn = false;
    climateOn = false;
    audioOn = true;
    settingsOn = false;
    bassTrebleOn = false;
    brightnessOn = false;
    clockOn = false;
    $("#climateLogo").attr("src","images/climate3D");
    $("#audioLogo").attr("src","images/audioActive");
    $("#navigationLogo").attr("src","images/navigation3D");
    $("#settingsLogo").attr("src", "images/settings3D");
    $("#audioPage").show();
    $("#climatePage, #navigationPage, #settingsPage, #brightnessPage, #audioSettingsPage, #clockSettingsPage").hide();
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

      Leap.loop(controllerOptionsAudio, function(frame) {
      if(audioOn == false){
        controllerOptionsAudio.disconnect();
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

                function timeOut(){
                  controllerOptionsAudio.disconnect();
                }


                // if (frame.gestures.length > 0) {
                //   for (var i = 0; i < frame.gestures.length; i++) {
                //     var gesture = frame.gestures[i];
                //     if(gesture.type == "swipe") {
                //         var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                //         if(isHorizontal){
                //             if(gesture.direction[0] > 0){
                //               increaseSong();
                //               return;
                //               // window.setTimeout(timeOut, 2000);
                //               // controllerOptionsAudio.connect();
                //               // window.clearTimeout(timeOut);
                //
                //             }
                //             else {
                //               decreaseSong();
                //               return;
                //               // window.setTimeout(timeOut, 2000);
                //               // controllerOptionsAudio.connect();
                //               // window.clearTimeout(timeOut);
                //             }
                //         }
                //      }
                //    }
                // }
                function isPlaying(song) {
                   return !song.paused;
                 }
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
                    if(gesture.type == "keyTap"){
                      var direction = gesture.direction;
                      if(counter == 0){
                        if(isPlaying(playing)){
                          playing.pause();
                        }
                        else{
                          playing.play();
                        }
                      }
                      if(counter == 1){
                        if(isPlaying(playing1)){
                          playing1.pause();
                        }
                        else{
                          playing1.play();
                        }
                      }
                      if(counter == 2){
                        if(isPlaying(playing2)){
                          playing2.pause();
                        }
                        else{
                          playing2.play();
                        }
                      }
                      if(counter == 3){
                        if(isPlaying(playing3)){
                          playing3.pause();
                        }
                        else{
                          playing3.play();
                        }
                      }
                      if(counter == 4){
                        if(isPlaying(playing4)){
                          playing4.pause();
                        }
                        else{
                          playing4.play();
                        }
                      }
                      if(counter == 5){
                        if(isPlaying(playing5)){
                          playing5.pause();
                        }
                        else{
                          playing5.play();
                        }
                      }
                    }
                }
                }




                if(velocity > 700 && count < 100){//function to change volume
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

                if(velocity < (-700) && count > 1){
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
  controllerOptionsAudio.connect();
    }
  }








  function settings(){
    navigationOn = false;
    climateOn = false;
    audioOn = false;
    settingsOn = true;
    bassTrebleOn = false;
    brightnessOn = false;
    clockOn = false;
    $("#climateLogo").attr("src","images/climate3D");
    $("#audioLogo").attr("src", "images/audio3D");
    $("#navigationLogo").attr("src", "images/navigation3D");
    $("#settingsLogo").attr("src", "images/settingsActive");
    $("#settingsPage").show();
    $("#climatePage, #audioPage, #navigationPage, #brightnessPage, #audioSettingsPage, #clockSettingsPage").hide();

    if(settingsOn == true){

      // function nextSetting(){
      //   if (settingsCount == 0){
      //     $("#brightnessSet").removeClass("settingHighlight");
      //     $("#audioSet").addClass("settingHighlight");
      //     settingsCount++;
      //   }
      //   else if (settingsCount == 1){
      //     $("#audioSet").removeClass("settingHighlight");
      //     $("#clockSet").addClass("settingHighlight");
      //     settingsCount++;
      //   }
      //   else if (settingsCount == 2){
      //     $("#clockSet").removeClass("settingHighlight");
      //     $("#oneMoreSet").addClass("settingHighlight");
      //     settingsCount++;
      //   }
      //   else{
      //     $("#oneMoreSet").removeClass("settingHighlight");
      //     $("#brightnessSet").addClass("settingHighlight");
      //     settingsCount = 0;
      //   }
      // }
      // function backSetting(){
      //   if (settingsCount == 0){
      //     $("#brightnessSet").removeClass("settingHighlight");
      //     $("#oneMoreSet").addClass("settingHighlight");
      //     settingsCount = 3;
      //   }
      //   else if (settingsCount == 1){
      //     $("#audioSet").addClass("settingHighlight");
      //     $("#clockSet").removeClass("settingHighlight");
      //     settingsCount--;
      //   }
      //   else if (settingsCount == 2){
      //     $("#clockSet").addClass("settingHighlight");
      //     $("#oneMoreSet").removeClass("settingHighlight");
      //     settingsCount--;
      //   }
      //   else{
      //     $("#oneMoreSet").addClass("settingHighlight");
      //     $("#brightnessSet").removeClass("settingHighlight");
      //     settingsCount = 0;
      //   }
      // }

      Leap.loop(controllerOptionsSettings, function(frame) {
        if(settingsOn == false){
          controllerOptionsSettings.disconnect();
          return;
        }
        if (frame.hands.length > 0) {
            for (var i = 0; i < frame.hands.length; i++) {
                var hand = frame.hands[i];
                var newP = hand.palmPosition;
                var height = newP[1];
                // console.log(height);
              }
            }
        if (frame.gestures.length > 0) {

          for (var i = 0; i < frame.gestures.length; i++) {
            var gesture = frame.gestures[i];
            var tap = gesture.type;
            }
          }
          if(height >= 300){
            $("#audioSet").removeClass("settingHighlight");
            $("#brightnessSet").addClass("settingHighlight");
            $("#oneMoreSet").removeClass("settingHighlight");
            if(tap == "keyTap"){
              // console.log("key tap");
              brightness();
            }
          }
          if(height >= 150 && height < 300){
            $("#brightnessSet").removeClass("settingHighlight");
            $("#audioSet").addClass("settingHighlight");
            $("#clockSet").removeClass("settingHighlight");
            if(tap == "keyTap"){
              // console.log("key tap2");
              bassTreble();
            }
          }
          if(height >= 50 && height < 150){
            $("#audioSet").removeClass("settingHighlight");
            $("#clockSet").addClass("settingHighlight");
            $("#oneMoreSet").removeClass("settingHighlight");
            if(tap == "keyTap"){
              // console.log("key tap3");
              clock();
            }
          }
          // if(height >= 0 && height < 100){ THIS IS FOR FOURTH SETTINGS OPTION
          //   $("#clockSet").removeClass("settingHighlight");
          //   $("#oneMoreSet").addClass("settingHighlight");
          //   $("#brightnessSet").removeClass("settingHighlight");
          //   if(tap == "keyTap"){
          //     console.log("key tap4");
          //   }
          // }
          }); //end of leap loop

        // if (frame.gestures.length > 0) {
        //   for (var i = 0; i < frame.gestures.length; i++) {
        //     var gesture = frame.gestures[i];
        //     if(gesture.type == "circle") {
        //       // console.log(gesture.type);
        //         var newD = gesture.normal;
        //         var clockwise = newD[2];
        //         clockwise = parseFloat(clockwise);
        //         var circlestate = gesture.state;
        //         var circleprogress = gesture.progress;
        //         var circleradius = gesture.radius;
        //         console.log(settingsCount);
        //
        //         if(clockwise < 0 && circlestate == "stop" && circleprogress > 1 && circleradius > 10){
        //             console.log("next setting");
        //             nextSetting();
        //         }
        //         else if(clockwise > 0 && circlestate == "stop" && circleprogress > 1 && circleradius > 10){
        //             backSetting();
        //             console.log("back setting");
        //
        //         }
        //     }
        //   }
        // }


      controllerOptionsSettings.connect();

    }
  }

  function brightness(){
    navigationOn = false;
    climateOn = false;
    audioOn = false;
    settingsOn = false;
    bassTrebleOn = false;
    brightnessOn = true;
    clockOn = false;
    $("#climateLogo").attr("src","images/climate3D");
    $("#audioLogo").attr("src", "images/audio3D");
    $("#navigationLogo").attr("src", "images/navigation3D");
    $("#settingsLogo").attr("src", "images/settingsActive");
    $("#brightnessPage").show();
    $("#climatePage, #audioPage, #navigationPage, #settingsPage, #audioSettingsPage, #clockSettingsPage").hide();
    if(brightnessOn == true){
      Leap.loop(controllerOptionsBrightness, function(frame) {
        if(brightnessOn == false){
          controllerOptionsBrightness.disconnect();
          return;
        }
        var bright = document.getElementById("brightBar");

        if (frame.hands.length > 0) {

          for (var i = 0; i < frame.hands.length; i++) {

              var hand = frame.hands[i];
              var newBrightV = hand.palmVelocity;//changing volume

              var velocityB = newBrightV[0];
              velocityB = parseFloat(velocityB);
              // console.log(velocityH);


              if (frame.gestures.length > 0) {
                for (var i = 0; i < frame.gestures.length; i++) {
                  var gesture = frame.gestures[i];
                  if(gesture.type == "swipe") {
                    console.log(count6);
                      var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                      if(isHorizontal){
                        if(velocityB > 200 && count6 < 150){//function to change fan speed
                          document.body.style.filter = "brightness(" + (count6/1.5) + "%)";

                            bright.style.width= count6*2+"px";
                            count6=count6+2;
                            }
                        if(velocityB < (-200) && count6 > 0){
                          document.body.style.filter = "brightness(" + count6 + "%)";

                            bright.style.width= count6*2+"px";
                            count6=count6-2;
                          }
                      }
                    }
                  }
                }
              }
            }
      });

    }
    controllerOptionsBrightness.connect();
  }

  function bassTreble(){
    navigationOn = false;
    climateOn = false;
    audioOn = false;
    settingsOn = false;
    bassTrebleOn = true;
    brightnessOn = false;
    clockOn = false;
    $("#climateLogo").attr("src","images/climate3D");
    $("#audioLogo").attr("src", "images/audio3D");
    $("#navigationLogo").attr("src", "images/navigation3D");
    $("#settingsLogo").attr("src", "images/settingsActive");
    $("#audioSettingsPage").show();
    $("#climatePage, #audioPage, #navigationPage, #settingsPage, #brightnessPage, #clockSettingsPage").hide();
    Leap.loop(controllerOptionsBassTreble, function(frame) {
      if(bassTrebleOn == false){
        controllerOptionsBassTreble.disconnect();
        return;
      }
      var bass = document.getElementById("bassBar");
      var treble = document.getElementById("trebleBar");

      if (frame.hands.length > 0) {

        for (var i = 0; i < frame.hands.length; i++) {

            var hand = frame.hands[i];
            var newAudioV = hand.palmVelocity;//changing volume

            var bassV = newAudioV[0];
            var trebleV = newAudioV[2];
            bassV = parseFloat(bassV);
            trebleV = parseFloat(trebleV);
            // console.log(velocityH);


            if (frame.gestures.length > 0) {
              for (var i = 0; i < frame.gestures.length; i++) {
                var gesture = frame.gestures[i];
                if(gesture.type == "swipe") {
                    var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                    if(isHorizontal){
                      if(bassV > 200 && count4 < 100){//function to change fan speed
                          bass.style.width= count4*3+"px";
                          count4=count4+2;
                          }
                      if(bassV < (-200) && count4 > 0){
                          bass.style.width= count4*3+"px";
                          count4=count4-2;
                        }
                    }
                    else{
                      if(trebleV > 200 && count5 < 100){//function to change temp
                        // console.log(count3);
                              treble.style.height= count5*3+"px";
                              count5=count5+2;
                          }
                      if(trebleV < (-200) && count5 > 0){
                          treble.style.height= count5*3+"px";
                          count5=count5-2;
                        }
                    }
                 }
               }
            }
          }
      }

    });
    controllerOptionsBassTreble.connect();
  }

  function clock(){
    navigationOn = false;
    climateOn = false;
    audioOn = false;
    settingsOn = false;
    bassTrebleOn = false;
    brightnessOn = false;
    clockOn = true;
    $("#climateLogo").attr("src","images/climate3D");
    $("#audioLogo").attr("src", "images/audio3D");
    $("#navigationLogo").attr("src", "images/navigation3D");
    $("#settingsLogo").attr("src", "images/settingsActive");
    $("#clockSettingsPage").show();
    $("#climatePage, #audioPage, #navigationPage, #settingsPage, #brightnessPage, #audioSettingsPage").hide();
    if(clockOn == true){
      Leap.loop(controllerOptionsBassTreble, function(frame) {
        if(clockOn == false){
          controllerOptionsClock.disconnect();
          return;
        }



      });
    }

    controllerOptionsBassTreble.connect();

  }


});