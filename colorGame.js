var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setupModeButtons();
	setupSquares();
	setupResetButton();

	reset();
}

function setupModeButtons() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			numSquares = this.textContent === "Easy" ? 3 : 6;
			reset();
		});
	}	
}

function setupResetButton() {
	resetButton.addEventListener("click", reset);
}

function setupSquares() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				// change all to correct color
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}	
}

// regenerate the colors and reset the colors
function reset() {
	// generate new colors and pick a new color
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	// change color of squares
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";			
		}
		else {
			squares[i].style.display = "none";
		}
	}	
	h1.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
}


// after click the correct color, set all squares to be that color
function changeColors(color) {
	// loop through all squares
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

// init all colors randomly
function generateRandomColors(num) {
	var colors = [];
	for(var i = 0; i < num; i++) {
		colors.push(randomColor());
	}
	return colors;
}

// generate one random rgb color
function randomColor() {
	var color = "rgb(";
	for(var i = 0; i < 2; i++) {
		color += Math.floor(Math.random() * 256);
		color += ", ";
	}
	color += Math.floor(Math.random() * 256);
	color += ")";
	return color
}

// pick a color to be guessed
function pickColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}