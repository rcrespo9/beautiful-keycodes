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
let squares = [];
let triangles = [];

class Circle {
	constructor(radius, width, xPos, yPos) {
		this.radius = radius;
		this,width = width;
		this.xPos = xPos;
		this.yPos = yPos;
	}

	draw() {
	    ctx.beginPath();
	   	ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false);
	    ctx.lineWidth = globalLineWidth;
	    ctx.strokeStyle = darkBlue;
	    ctx.stroke();
	    ctx.closePath();	
	}
}

class Square {
	constructor(length, xPos, yPos) {
		this.length = length;
		this.xPos = xPos;
		this.yPos = yPos;	
	}

	draw() {
		ctx.beginPath();
	    ctx.rect(this.xPos, this.yPos, this.length, this.length);
	    ctx.lineWidth = globalLineWidth;
	    ctx.strokeStyle = darkBlue;
	    ctx.stroke();
	    ctx.closePath();		
	}
}

class Triangle {
	constructor(xVar, yVar, xPos, yPos) {
		this.xVar = xVar;
		this.yVar = yVar;
		this.xPos = xPos;
		this.yPos = yPos;	
	}

	draw() {
	    ctx.beginPath();
	    ctx.fillStyle = darkBlue;
	    ctx.moveTo(this.xPos, this.yPos);
	    ctx.lineTo(this.xPos - this.xVar, this.yPos + this.yVar); 
	    ctx.lineTo(this.xPos + this.xVar, this.yPos + this.yVar);
	    ctx.fill();
	    ctx.closePath();		
	}
}

const drawShapes = function(keycode = 10) {
  let numShapes = Math.ceil((keycode / 3) * 1) / 1;

  if (canvas.getContext) {

    // circle    	
 	for(let i = 0; i < numShapes; i++) {
 		let randX = getRandomNum(0, canvas.width);
		let randY = getRandomNum(0, canvas.height);
 		let circle = new Circle(6, 0, randX, randY);

 		circles.push(circle);
    }

    // square	    
	for(let i = 0; i < numShapes; i++) {
		let randX = getRandomNum(0, canvas.width);
	    let randY = getRandomNum(0, canvas.height);
	    let square = new Square(12, randX, randY);

	    squares.push(square);
	}

    // triangle	    
	for(let i = 0; i < numShapes; i++) {
		let randX = getRandomNum(0, canvas.width);
	    let randY = getRandomNum(0, canvas.height);
	    let triangle = new Triangle(10, 12, randX, randY);

	    triangles.push(triangle);
	}

	executeFrame();
  }
}

drawShapes(10);

function executeFrame() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	for(let i = 0; i < circles.length; i++) {
		let circle = circles[i];
		circle.draw();
	}

	for(let i = 0; i < squares.length; i++) {
		let square = squares[i];
		square.draw();
	}

	for(let i = 0; i < triangles.length; i++) {
		let triangle = triangles[i];
		triangle.draw();
	}

    requestAnimationFrame(executeFrame);
}