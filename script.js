var img = document.getElementById('img');

var userScore, totalScore, redScore = 0, css;
var redSora = false;
var audio = new Audio('media/sora_dllm.mp3');

// function
function down() {
	increaseScore();
	if (redSora) {
		img.src = 'media/redSora_2.png';
		
		audio = new Audio('media/redSora_dllm.mp3');
		audio.load();
	} else {
		img.src = 'media/sora_2.png';
		
		audio = new Audio('media/sora_dllm.mp3');
		audio.load();
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
	
	redSoraToggle();
	updateDisplay();
}

function redSoraToggle() {
	if (redScore == 100) {
		redSora = !redSora;
		redScore = 0;
	}
	if (redSora) {
		css = document.querySelector('.text > div > *:first-child');
		css.style.color = 'rgba(247, 92, 98)';
		css.innerHTML = "RED";
		
		css = document.querySelector('body');
		css.style.background = 'linear-gradient(to right, rgb(253, 178, 172), rgb(255, 223, 221))';
		
		css = document.querySelector('.dialog');
		css.style.borderColor = 'rgb()';
		css.style.backgroundColor = 'rgb()';
		
		css = document.querySelectorAll(".dialog > *");
		for (let i = 0; i < css.length; i++) {
			css[i].style.color = 'rgb()';
		}
		
		css = document.querySelectorAll(".dialog > * > *:first-child");
		for (let i = 0; i < css.length; i++) {
			css[i].style.color = 'rgb()';
		}
	} else {
		css = document.querySelector('.text > div > *:first-child');
		css.style.color = 'rgb(255, 163, 183)';
		css.innerHTML = "ZIZI";
		
		css = document.querySelector('body');
		css.style.background = 'linear-gradient(to right, rgb(250, 204, 214), rgb(255, 244, 248))';
		
		css = document.querySelector('.dialog');
		css.style.borderColor = 'rgb(244, 171, 182)';
		css.style.backgroundColor = 'rgb(254, 217, 224)';
		
		css = document.querySelectorAll(".dialog > *");
		for (let i = 0; i < css.length; i++) {
			css[i].style.color = 'rgb(243, 163, 190)';
		}
		
		css = document.querySelectorAll(".dialog > * > *:first-child");
		for (let i = 0; i < css.length; i++) {
			css[i].style.color = 'rgb(255, 118, 153)';
		}
	}
}

function updateDisplay() {
	css = document.querySelectorAll(".text > *:nth-child(2), .dialog > *:first-child > *:last-child");
	for (let i = 0; i < css.length; i++) {
		css[i].innerHTML = userScore;
	}
	
	// css = document.querySelector('.dialog > *:last-child > *:last-child');
	// css[i].innerHTML = totalScore;
}

function readStorage() {
	if (localStorage.getItem('userScore')) {
		userScore = parseFloat(localStorage.getItem('userScore'));
		totalScore = parseFloat(0);
		totalScore += userScore;
		updateDisplay();
	}
}

function writeStorage() {
	localStorage.setItem('userScore', userScore);
}

function clear(){
	localStorage.clear();
	
	userScore = 0;
	totalScore = 0;
	redScore = 0;
	redSora = false;
	
	redSoraToggle();
	updateDisplay();
	
	img.src = 'media/sora_1.png';
}

// event

img.onmousedown = e => {
	e.preventDefault();
	down();
}
    
img.onmouseup = e => {
	e.preventDefault();
	up();
}

img.ontouchstart = e => {
	e.preventDefault();
	down();
}
    
img.ontouchend = e => {
	e.preventDefault();
	up();
}

window.onkeydown = e => {
	if (e.keyCode === 13) {
		down();
	}
}

window.onkeyup = e => {
	if (e.keyCode === 13) {
		up();
	}
}

window.addEventListener("load", readStorage);

window.addEventListener("pagehide", writeStorage);

img.oncontextmenu = () => {return false;}