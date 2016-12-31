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

function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

const canvas = document.getElementById('js-particles');
	  canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
const globalLineWidth = 3;
const darkBlue = '#16243c';
let circles = [];

function Circle(radius, width, xPos, yPos) {
	this.radius = radius;
	this,width = width;
	this.xPos = xPos;
	this.yPos = yPos;

	this.counterX = 0;
	this.counterY = 0;	
}

Circle.prototype.update = function() {
	this.counterX++;
	this.counterY++;

    ctx.beginPath();
   	ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false);
    ctx.lineWidth = globalLineWidth;
    ctx.strokeStyle = darkBlue;
    ctx.stroke();
    ctx.closePath();

    if(this.xPos + this.counterX > ctx.canvas.width - this.radius || this.xPos > ctx.canvas.width - this.radius) {
        this.counterX = -this.counterX;
    }
    if(this.yPos + this.counterY > ctx.canvas.height - this.radius || this.yPos + this.counterY < this.radius) {
        this.counterY = -this.counterY;
    }

    this.xPos += this.counterX;
    this.yPos += this.counterY;
}

function Square(width, height, xPos, yPos) {
	this.radius = radius;
	this,width = width;
	this.xPos = xPos;
	this.yPos = yPos;	
}

function Triangle(firstLine, secondLine, xPos, yPos) {
	this.firstLine = firstLine;
	this,secondLine = secondLine;
	this.xPos = xPos;
	this.yPos = yPos;	
}

var drawShapes = function(keycode = 10) {
  let numShapes = Math.ceil((keycode / 3) * 1) / 1;

  if (canvas.getContext) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // circle    	
 	for(let i = 0; i < numShapes; i++) {
 		let randX = getRandomNum(0, canvas.width);
		let randY = getRandomNum(0, canvas.height);
 		let circle = new Circle(6, 0, randX, randY);

 		circles.push(circle);
    }

    executeFrame();
 //    // square	    
	// for(let i = 0; i < numShapes; i++) {
	// 	const squareRandX = getRandomNum(0, canvas.width);
	//     const squareRandY = getRandomNum(0, canvas.height);

	//     ctx.beginPath();
	//     ctx.rect(squareRandX, squareRandY, 12, 12);
	//     ctx.lineWidth = 3;
	//     ctx.strokeStyle = darkBlue;
	//     ctx.stroke();
	//     ctx.closePath();
	// }

 //    // triangle	    
	// for(let i = 0; i < numShapes; i++) {
	// 	const triangleRandX = getRandomNum(0, canvas.width);
	//     const triangleRandY = getRandomNum(0, canvas.height);

	//     ctx.beginPath();
	//     ctx.fillStyle = darkBlue;
	//     ctx.moveTo(triangleRandX, triangleRandY);
	//     ctx.lineTo(triangleRandX - 10, triangleRandY + 12); 
	//     ctx.lineTo(triangleRandX + 10, triangleRandY + 12);
	//     ctx.fill();
	//     ctx.closePath();
	// }
  }
}

console.log(circles);

drawShapes(3);

function executeFrame() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	for(let i = 0; i < circles.length; i++) {
		let circle = circles[i];
		circle.update();
	}

    requestAnimationFrame(executeFrame);
}