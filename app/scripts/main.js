const number = document.getElementById('js-keycode');
const text = document.getElementById('js-key');

window.addEventListener('keydown', function(e) {
	let keyCode = e.keyCode;
	number.innerHTML = keyCode;

	let key = e.key;
	text.innerHTML = key; 
});
