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

function drawShapes() {
  const canvas = document.getElementById('js-particles');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const strokeWidth = 3;
    const darkBlue = '#16243c';
    let triangleXPos = 70;
    let triangleYPos = 20;

    // circle
    ctx.beginPath();
    ctx.arc(75, 75, 6, 0, Math.PI * 2, false);
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = darkBlue;
    ctx.stroke();

    // square
    ctx.beginPath();
    ctx.rect(30, 30, 12, 12);
    ctx.lineWidth = 3;
    ctx.strokeStyle = darkBlue;
    ctx.stroke();

    // triangle
    ctx.beginPath();
    ctx.fillStyle = darkBlue;
    ctx.moveTo(triangleXPos, triangleYPos);
    ctx.lineTo(triangleXPos - 10, triangleYPos + 12); 
    ctx.lineTo(triangleXPos + 10, triangleYPos + 12);
    ctx.fill();
  }
}

drawShapes();