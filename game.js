buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var currentScore = 0;
var highScore = 0;


// Start to play detect any button pressed
$(document).keypress(function() {
  $(document).unbind("keypress");
  $("h1").text("Level 0");
  nextSequence()
});

level = 0;
// Main Game Sequence
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * (3 - 0 + 1) + 0);
  console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  console.log(randomChosenColour)
  var pushColor = gamePattern.push(randomChosenColour)
  var colorAsButton = $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
  console.log(colorAsButton)
  level++
  $("h1").text("Level " + level);
}


// Functionality on click, animation and sounds//
$(document).on('click', '.btn', function(event) {
  currentScore++
  $(".currentScore").text("Current score: " + currentScore)
  var buttonPressed = (event.target.id);
  var addToUserSequence = userClickedPattern.push(buttonPressed);
  checkAnswer(gamePattern, userClickedPattern);
  var audio = new Audio("sounds/" + buttonPressed + ".mp3");
  audio.play();
  animatePress(buttonPressed)
});

// Animation function which is being called
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return youLostBro();
    }

    return afterAnswerCheck();
}

function afterAnswerCheck () {
  var delayInMilliseconds = 1000; //1 seconds
  setTimeout(function() {
    userClickedPattern = [];
    nextSequence()
}, delayInMilliseconds);
}

function youLostBro() {
  $("body").addClass("game-over")
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 300);
  if(currentScore > highScore) {
    var newHighScore = currentScore
    $(".highScore").text("High score: " + newHighScore);
  }
  startOver();
}

function startOver() {
  currentScore = 0;
  $(".currentScore").text("Current score: " + currentScore)
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  setTimeout(function() {
    nextSequence();
  }, 200);
}

$(document).on('click', '#popupclose', function(event) {
  $(".buttonCloses").css("visibility", "hidden");
});
