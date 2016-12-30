'use strict';

const number = document.getElementById('js-keycode');
const text = document.getElementById('js-key');

window.addEventListener('keydown', function(e) {
	let keyCode = e.keyCode;
	let key = e.key;

	console.log(e);

	number.innerHTML = keyCode;

	text.innerHTML = key; 
});
