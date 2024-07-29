// note: all of the variables are global variables
var die1, die2, dieSum, balance, banner, outcome, die1Name, die2Name, numRolls; // define variables
balance = 0;  // initial value
var die1Image = new Image();
var die2Image = new Image();
var dieHistory = [];

function rollDice() {
    die1 = Math.floor(Math.random() * 6) + 1;
    die2 = Math.floor(Math.random() * 6) + 1;
    dieSum = die1 + die2;

    // set the dice images based on the roll
    die1Image = document.querySelectorAll("img")[0];
    die1Name = "images/dice" + die1 + ".png";
    die1Image.setAttribute("src", die1Name);

    die2Image = document.querySelectorAll("img")[1];
    die2Name = "images/dice" + die2 + ".png";
    die2Image.setAttribute("src", die2Name);

    dieHistory.push({die1: die1, die2: die2, sum: dieSum});
}

function whoWon() {
    // in h3 report how much money was won or lost and the balance
    if (dieSum <= 5){
        outcome = "You lose, please pay me " + 5 + " dollars.";
        balance -= 5;
    } else if (dieSum >= 9){
        outcome = "You win, I pay you " + 5 + " dollars.";
        balance += 5;
    } else {
        outcome = "It's a draw, nobody wins or loses.";
    }

    // Report the outcome:
    banner = die1 + " + " + die2 + " is: " + dieSum;
    document.querySelector("h3").innerHTML = banner + "<br>" + outcome + "<br> Current balance: $" + balance;

    dieHistory[dieHistory.length - 1].outcome = outcome;
}

function letsPlay(){
    rollDice();
    whoWon();
}

function showHistory(){
    var historyDiv = document.getElementById("history"); // Corrected typo here
    historyDiv.innerHTML = "<h3>Roll History:</h3>";
    for (var i = 0; i < dieHistory.length; i++) {
        historyDiv.innerHTML += "Roll " + (i + 1) + ": Dice 1: "
            + dieHistory[i].die1 + " + Dice 2: "
            + dieHistory[i].die2 + " = Sum: " 
            + dieHistory[i].sum + " - " 
            + dieHistory[i].outcome + "<br>";
    }
}

document.getElementById("send").addEventListener("submit", function(event) {
    event.preventDefault();
    var numRolls = document.querySelector("input[type='number']").value;
    if (numRolls > 0) {
        dieHistory = [];
        balance = 0;
        for (var i = 0; i < numRolls; i++) {
            letsPlay();
        }
        showHistory();
    }
});
