var img = document.getElementById("pop");
var textScoreDisplay = document.getElementById("textScore");
var userScoreDisplay = document.getElementById("userScore");
var totalScoreDisplay = document.getElementById('totalScore');
var userScore = 0;
var totalScore = 3000;
var audio = new Audio('media/sora_dllm.mp3');

// system
var downEvent = (
	function() {
		if ('ontouchstart' in document.documentElement === true) 
			return 'touchstart';
		else
			return 'mousedown';
	}
)();

var upEvent = (
	function() {
		if ('ontouchend' in document.documentElement === true) 
			return 'touchend';
		else
			return 'mouseup';
	}
)();

// function
function down() {
    increaseScore();
    img.src = 'media/sora_2.png';
	
	if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
    }
    audio.play();
}

function up() {
	img.src = 'media/sora_1.png';
}

function increaseScore() {
    userScore++;
    totalScore++;
	updateDisplay();
}

function updateDisplay() {
    textScoreDisplay.innerHTML = userScore;
    userScoreDisplay.innerHTML = userScore;
    totalScoreDisplay.innerHTML = totalScore;
}

function readStorage() {
	if (localStorage.getItem('userScore')) {
		userScore = localStorage.getItem('userScore');
		totalScore += parseFloat(userScore, 10);
		updateDisplay();
	}
}

function writeStorage() {
	localStorage.setItem('userScore', userScore);
}

// event
img.addEventListener('mousedown', e => {
	e.preventDefault();
	down();
});
    
img.addEventListener("mouseup", e => {
	e.preventDefault();
	up();
});

img.addEventListener("touchstart", e => {
	e.preventDefault();
	down();
});
    
img.addEventListener("touchend", e => {
	e.preventDefault();
	up();
});

window.addEventListener("load", readStorage);

window.addEventListener("pagehide", writeStorage);


