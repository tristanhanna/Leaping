// Store frame for motion functions
var previousFrame;
var paused = false;
var pauseOnGesture = false;
var count=1;
// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {
  if (paused) {
    return; // Skip this update
  }
  // Display Hand object data
  var handOutput = document.getElementById("handData");
  
  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];
        
        var handPosition = hand.palmPosition;
        
        var newyaxis = handPosition[1];
        
        //handString += "<div style='width:300px; float:left; padding:5px'>";
        //handString += "Y Axis: " + newyaxis + " mm<br />";
        //handString += "</div>";
        
        var yaxis = parseFloat(newyaxis);
        var ymapped = proportion(yaxis, 600, 0, 255);
        document.body.style.background = "rgba("+ymapped+", "+ymapped+", "+ymapped+", 1)";
    }
  }
    
    
    
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
              
              if(theDirection > 0 && count < 8 && state=="stop"){
                  volumePart.innerHTML = '<img src="img/1x/volume'+(count+1)+'.png">';
                    count++;
              }
              
              if(theDirection < 0 && count > 1 && state=="stop"){
                  volumePart.innerHTML = '<img src="img/1x/volume'+(count-1)+'.png">';
                    count--;
              }
              
          break;
              
        default:
      }
    }
  }
  previousFrame = frame;
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
