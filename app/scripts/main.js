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

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function drawShapes(keyCodeNum = 36) {
  const canvas = document.getElementById('js-particles');
  let numShapes = Math.ceil((keyCodeNum / 3) * 1) / 1;

  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const strokeWidth = 3;
    const darkBlue = '#16243c';

    // circle
    for(let i = 0; i < numShapes; i++) {
    	ctx.beginPath();
	   	ctx.arc(getRandomArbitrary(0, canvas.width), getRandomArbitrary(0, canvas.height), 6, 0, Math.PI * 2, false);
	    ctx.lineWidth = strokeWidth;
	    ctx.strokeStyle = darkBlue;
	    ctx.stroke();
	    ctx.closePath();
    }

    // square
    for(let i = 0; i < numShapes; i++) {
	    ctx.beginPath();
	    ctx.rotate(360);
	    ctx.rect(getRandomArbitrary(0, canvas.width), getRandomArbitrary(0, canvas.height), 12, 12);
	    ctx.lineWidth = 3;
	    ctx.strokeStyle = darkBlue;
	    ctx.stroke();
	    ctx.closePath();
	}

    // triangle
    for(let i = 0; i < numShapes; i++) {
	    let triangleXPos = getRandomArbitrary(0, canvas.width);
	    let triangleYPos = getRandomArbitrary(0, canvas.height);

	    ctx.beginPath();
	    ctx.rotate(360);
	    ctx.fillStyle = darkBlue;
	    ctx.moveTo(triangleXPos, triangleYPos);
	    ctx.lineTo(triangleXPos - 10, triangleYPos + 12); 
	    ctx.lineTo(triangleXPos + 10, triangleYPos + 12);
	    ctx.fill();
	    ctx.closePath();
	}
  }

}

drawShapes(50);