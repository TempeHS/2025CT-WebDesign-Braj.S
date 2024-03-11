let enterName = prompt("Enter your name");
let PlayerGuess;
let PlayerFeedback = "test";
let computerGuess;
loadDIV ();


function loadDIV () {
document.getElementById("ScriptThisDIV").innerHTML = "<H1>Hello " + enterName + "</H1>"
document.getElementById("ScriptThisDIV").innerHTML = document.getElementById("ScriptThisDIV").innerHTML + "</H1><H2>Guess a number between 1 & 2</H2>"
document.getElementById("ScriptThisDIV").innerHTML = document.getElementById("ScriptThisDIV").innerHTML + PlayerFeedback
}

function enterNumber () {
    PlayerGuess = prompt("Enter a number")
}