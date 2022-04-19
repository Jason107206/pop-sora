var img = document.getElementById('pop');
var title = document.getElementById('title');
var textScoreDisplay = document.getElementById('textScore');
var userScoreDisplay = document.getElementById('userScore');
var totalScoreDisplay = document.getElementById('totalScore');

var userScore = 0;
var totalScore = 0;
var redSora = false;
var redScore = 0;
var audio = new Audio('media/sora_dllm.mp3');
var bg = document.getElementById('bg').style;

audio.muted = true;
audio.play();
audio.muted = false;

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
	if (redSora) {
		img.src = 'media/redSora_2.png';
	} else {
		img.src = 'media/sora_2.png';
	}
	
	if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
    }
    audio.play();
}

function up() {
	if (redSora) {
		img.src = 'media/redSora_1.png';
	} else {
		img.src = 'media/sora_1.png';
	}
}

function increaseScore() {
    userScore++;
    totalScore++;
	redScore++;
	
	redSoraCheck();
	updateDisplay();
}

function redSoraCheck() {
	if (redScore == 100) {
		redSora = !redSora;
		redScore = 0;
	}
	if (redSora) {
		title.innerHTML = 'RED';
		title.style.color = 'rgb(247, 92, 98)';
		bg.background = 'linear-gradient(to right, rgb(253, 178, 172), rgb(255, 223, 221))'
	} else {
		title.innerHTML = 'ZIZI';
		title.style.color = 'rgb(255, 163, 183)';
		bg.background = 'linear-gradient(to right, rgb(250, 204, 214), rgb(255, 244, 248))';
	}
}

function updateDisplay() {
    textScoreDisplay.innerHTML = userScore;
    userScoreDisplay.innerHTML = userScore;
    // totalScoreDisplay.innerHTML = totalScore;
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

function clear(){
	localStorage.clear();
	userScore = 0;
	redScore = 0;
	redSora = false;
	redSoraCheck();
}

// event
img.addEventListener('mousedown', e => {
	e.preventDefault();
	down();
});
    
img.addEventListener('mouseup', e => {
	e.preventDefault();
	up();
});

img.addEventListener('touchstart', e => {
	e.preventDefault();
	down();
});
    
img.addEventListener('touchend', e => {
	e.preventDefault();
	up();
});

window.addEventListener('keydown', e => {
	if (e.keyCode === 13) {
		down();
	}
});

window.addEventListener('keyup', e => {
	if (e.keyCode === 13) {
		up();
	}
});

window.addEventListener("load", readStorage);

window.addEventListener("pagehide", writeStorage);