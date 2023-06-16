var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(buttonColors[randomNumber]);
    
    
}

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animateClick(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name)
{
    var name = new Audio("sounds/" + name + ".mp3");
    name.play();
}

function animateClick(currentColor)
{
   
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColor).removeClass("pressed");
          }, 100);
    
}

$(document).keypress(function () {
    
    if (started === false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

    
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (currentLevel === gamePattern.length - 1)
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        console.log("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}