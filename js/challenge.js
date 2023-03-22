document.addEventListener('DOMContentLoaded', setup);
const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus')
const heart = document.querySelector('#heart');
const pauser = document.querySelector('#pause')
const comments = document.querySelector('.comments');
const form = document.getElementById('comment-form');

let interval;
let paused;
	


function setup() {
	interval = counterLoop();
	plus.addEventListener('click', increaseCounter);
	minus.addEventListener('click', decreaseCounter);
	heart.addEventListener('click', handleLike);
	pauser.addEventListener('click', toggle);
}

function counterLoop() {
	const counter = getCounter();
	const timer = setInterval(() => {
		increaseCounter(counter);
	}, 1000);
	return timer;
}

function getCounter() {
	return document.querySelector('#counter');
}

function increaseCounter() {
	const counter = getCounter();
	const currentCounter = parseInt(counter.textContent, 10);
	counter.textContent = currentCounter + 1;
}

function decreaseCounter() {
	const counter = getCounter();
	const currentCounter = parseInt(counter.textContent, 10);
	counter.textContent = currentCounter - 1;
}

function pause() {
	paused = true;
	clearInterval(interval);
	const buttons = document.querySelectorAll('button');
	const pauseButton = document.querySelector('#pause');
	buttons.forEach(button => {
		if (button != pauseButton) button.disabled = true;
	})
	pauseButton.textContent = "resume";
}

function resume() {
	paused = false;
	interval = counterLoop();
	const buttons = document.querySelectorAll('button');
	const resumeButton = document.querySelector('#pause');
	buttons.forEach(button => {
		button.disabled = false;
	})
	resumeButton.textContent = "pause";
}

function toggle() {
	if (paused) resume();
	else pause();
}

function handleLike() {
	const counter = getCounter();
	const counterSeconds = counter.textContent;
	const ulLikes = document.querySelector('.likes');
	if (ulLikes.childNodes.length < 1) {
		addLike(counter, ulLikes);
	} else {
	const liLike = ulLikes.lastElementChild;
	const [liCounter,,,,liSeconds] = liLike.textContent.split(' ');
	if (liCounter.trim() != counterSeconds.trim()) {
		addLike(counter, ulLikes);
	} else {
		const newSeconds = parseInt(liSeconds, 10) + 1
		console.log(liSeconds);
		liLike.textContent = `${liCounter} has been liked ${newSeconds} times`;
	} 
	}
}

function addLike(counter, ul) {
	const li = document.createElement('li');
	li.textContent = `${counter.textContent.trim()} has been liked 1 time`;
	ul.appendChild(li);
}

form.addEventListener("submit", (e) => {
        e.preventDefault();
        if(!paused){
            const comment = document.createElement("p");
            comment.textContent = new FormData(form).get('comment');
            comments.appendChild(comment);
            form.reset();
        }
   });