'use strict';

const number = document.getElementById('js-keycode');
const text = document.getElementById('js-key');

window.addEventListener('keydown', function(e) {
	let keyCode = e.keyCode;
	let key = e.key;

	function keyFormatter(keycode) {
		var specialKeys = {
			20: 'caps lock',
			32: 'spacebar',
			37: 'arrow left',
			38: 'arrow up',
			39: 'arrow right',
			40: 'arrow down'
		}

		if(specialKeys[keycode]) {
			return specialKeys[keycode]; 
		} else {
			return key;
		}
	}


	number.innerHTML = keyCode;
	text.innerHTML = keyFormatter(keyCode); 
});
