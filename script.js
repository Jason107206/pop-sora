var img = document.getElementById('img');
var userScore = 0, mode = 0, initStatus = true, keyStatus = false, css, audio;
var audio = new Audio('media/sora_dllm.mp3'); 

// function
function init() {
	if (new URLSearchParams(window.location.search).has('clear')) {
		clear();
		window.location = window.location.href.split("?")[0];
	}
	
	readStorage();
	modeToggle();
	initStatus = false;
}

function keyDown() {
	increaseScore();
	if (mode > 0) {
		img.src = 'media/redSora_2.png';
		audio = new Audio('media/redSora_dllm.mp3');
	} else {
		img.src = 'media/sora_2.png';
		audio = new Audio('media/sora_dllm.mp3');
	}
	audio.load();
	audio.play();
}

function keyUp() {
	if (mode > 0) {
		img.src = 'media/redSora_1.png';
	} else {
		img.src = 'media/sora_1.png';
	}
}

function increaseScore() {
    userScore++;
	modeToggle();
	updateDisplay();
}

function modeToggle() {
	var r = Math.floor(userScore / 100);	
	if (userScore - r * 100 === 0 || initStatus) {
		mode = r - Math.floor(r / 2) * 2;
		
		if (mode === 0) {
			img.src = 'media/sora_1.png';
			
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
				css[i].style.color = 'rgb(244, 171, 182)';
			}
			
			css = document.querySelectorAll(".dialog > * > *:first-child");
			for (let i = 0; i < css.length; i++) {
				css[i].style.color = 'rgb(255, 118, 153)';
			}
		}
		
		if (mode === 1) {
			img.src = 'media/redSora_1.png';
			
			css = document.querySelector('.text > div > *:first-child');
			css.style.color = 'rgba(247, 92, 98)';
			css.innerHTML = "RED";
			
			css = document.querySelector('body');
			css.style.background = 'linear-gradient(to right, rgb(253, 178, 172), rgb(255, 223, 221))';
			
			css = document.querySelector('.dialog');
			css.style.borderColor = 'rgb(239, 148, 148)';
			css.style.backgroundColor = 'rgb(255, 198, 198)';
			
			css = document.querySelectorAll(".dialog > *");
			for (let i = 0; i < css.length; i++) {
				css[i].style.color = 'rgb(239, 148, 148)';
			}
			
			css = document.querySelectorAll(".dialog > * > *:first-child");
			for (let i = 0; i < css.length; i++) {
				css[i].style.color = 'rgb(240, 106, 108)';
			}
		}
	}
}

function updateDisplay() {
	css = document.querySelectorAll(".text > *:nth-child(2), .dialog > *:first-child > *:last-child");
	for (let i = 0; i < css.length; i++) {
		css[i].innerHTML = userScore;
	}
}

function readStorage() {
	if (localStorage.getItem('userScore')) {
		userScore = parseFloat(localStorage.getItem('userScore'));
		updateDisplay();
	}
}

function writeStorage() {
	localStorage.setItem('userScore', userScore);
}

function clear() {
	if (new URLSearchParams(window.location.search).has('clear')) {
		localStorage.clear();
		userScore = 0;
		
		modeToggle();
		updateDisplay();
		
		img.src = 'media/sora_1.png';
	}
}

function lastUpdate() {
	return '2:05 3/9/2022';
}

// event

img.onmousedown = e => {
	e.preventDefault();
	keyDown();
}
    
img.onmouseup = e => {
	e.preventDefault();
	keyUp();
}

img.ontouchstart = e => {
	e.preventDefault();
	keyDown();
}
    
img.ontouchend = e => {
	e.preventDefault();
	keyUp();
}

window.onkeydown = e => {
	if (e.keyCode === 13 && keyStatus == false) {
		keyDown();
		keyStatus = true;
	}
}

window.onkeyup = e => {
	if (e.keyCode === 13) {
		keyUp();
		keyStatus = false;
	}
}

window.addEventListener("load", init);

window.addEventListener("pagehide", writeStorage);

img.oncontextmenu = () => {return false;}