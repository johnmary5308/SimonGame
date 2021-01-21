//create a variable that will store the diffrent button colors
var buttonColors = ["green", "red", "yellow", "blue"];
//create an empty array that stores the random colors that is generated
var gamePattern = [];
var userChosenPattern = [];

var level = 0;
var started = false;

//detect a keypress on the keybord then start the game
$(document).keypress(function(){
  if(!started){
    $("h1").text("level " + level );
    nextSequence();
    started = true;
  }
});

//determine what happens when the user clicks
//detect click on the buttons and get the id of the button that was clicked
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  //add the button colors to the userChosenPattern array
  userChosenPattern.push(userChosenColor);
  //add souund to the clicked button
  playSound(userChosenColor);
  animatePress(userChosenColor);
  condition(userChosenPattern.length -1);


});


function condition(currentLevel){
  if(gamePattern[currentLevel] === userChosenPattern[currentLevel]){
    console.log("success");
    if(userChosenPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();

      }, 1000);

    }
  }
  else{
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    startOver();
  }
}



//trying to randomly select the buttonColors
//?create a function for reuse sake
function nextSequence() {
//reset the userchosen pattern to an empty array once next sequence is triggered
//next sequence is only triggered when the usercp = gamep
  userChosenPattern = [];
  //level should increase as next sequence is being called
  level++;
  //update change in the value of level
  $("h1").text("level " + level );
  //create a random number beween 0 and 3 for the indexes of the color
  var randomNumber = Math.floor(Math.random() * 4);
  //random color generated from using the randomNumber as index
  var randomChosenColor = buttonColors[randomNumber];
  //keep adding the random colors to the end of the gamepattern
  gamePattern.push(randomChosenColor);
  //we want there to be an animation that shows that the color has been chosen
  //when next sequence is called
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //we want there to be a sound that correlates to the button chosen when
  //when next sequence is called
  playSound(randomChosenColor);


}

//when we click it we want it to play a sound this shows we are using
//the sound more than once
//it takes in the userchosen color and the randomChosenColor as name
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor){
  //add class pressed to the button clicked
  $("#" + currentColor).addClass("pressed");
  //remove class pressed from the button clicked after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//to start over reset the values of level, gamepattern, and started
//this is only called when the user fails i.e choses the wrong colors

function startOver(){
level = 0;
gamePattern = [];
started = false;
}
