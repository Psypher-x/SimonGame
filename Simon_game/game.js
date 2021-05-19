
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var start=false;
var level=0;


//To start game with any key
$(document).keypress(function(event)
{
  if(!start)
  {
      $("#level-title").text("Level "+level)
      nextSequence();
      start=true;
  }
});

//identifies button and plays sound
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // //Play sound and animation function call
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {


    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }

    else
    {
      playSound("wrong");

      $("body").addClass("game-over");

      $("h1").text("GAME OVER, Press any key to restart game");

      setTimeout(function () {
          $("body").removeClass("game-over");
      }, 200);

      //reset all the parameter
    level=0;

    start=false;

    gamePattern=[];
    }

}


function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}


function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence()
{
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);//random num from 0-3

    var randomChosenColour = buttonColours[randomNumber];//weill selectindexed color from array

    gamePattern.push(randomChosenColour);//will push pattern

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}
