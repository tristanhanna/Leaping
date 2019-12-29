// Store frame for motion functions

var paused = false;
//var pauseOnGesture = false;
var count=1;
// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {
  if (paused) {
    return; // Skip this update
  }
    var someData = document.getElementById("handData");
    var volume = document.getElementById("volumeBar");
    if (frame.hands.length > 0) {
        for (var i = 0; i < frame.hands.length; i++) {
            var hand = frame.hands[i];
            var newV = hand.palmVelocity;
            var velocity = newV[0];
            velocity = parseFloat(velocity);
            
            if(velocity > 1500 && count < 100){
                        volume.style.width= count+10+"em";
                        count++;
                    }
              
            if(velocity < (-1500) && count > 1){
                        volume.style.width= count-10+"em";
                        count--;
                    }
            
        }
    }
    
    
    //this works for volume control just not very heuristically
    /*
    var volumePart = document.getElementById("volumeBar");
  if (frame.gestures.length > 0) {
    if (pauseOnGesture) {
      togglePause();
    }
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];

      switch (gesture.type) {
        case "swipe":
              var newDirection = gesture.direction;
              var theDirection = newDirection[0];
              theDirection = parseFloat(theDirection);
              
              
                    var state = gesture.state;
              
                    if(theDirection > 0 && count < 100 && state=="stop"){
                        volumePart.style.width= count+20+"em";
                        count++;
                    }
              
                    if(theDirection < 0 && count > 1 && state=="stop"){
                        volumePart.style.width= count-20+"em";
                        count--;
                    }
                
              
              
          break;
              
        default:
      }
    }
  }*/
})   //END OF LEAP LOOP


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
