'use strict';

const utils = {
	getRandomNum: (min, max) => {
		return Math.random() * (max - min) + min;
	},

	convertToRadians: (degree) => {
		return degree * (Math.PI / 180);
	}	
}

const canvas = document.getElementById('js-particles');
const ctx = canvas.getContext('2d');
const globalLineWidth = 3;
const darkBlue = '#16243c';
const speed = 2;
let circles = [];
let squares = [];
let triangles = [];
let initialized = false;

// keycode display
const number = document.getElementById('js-keycode');
const text = document.getElementById('js-key');

function keyCodeDisplay(e) {
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
	circles = [];
	squares = [];
	triangles = [];
	drawShapes(keyCode);
	initialized = true;
}

window.addEventListener('keydown', keyCodeDisplay);

// shapes
class Circle {
	constructor(radius, width, xPos, yPos) {
		this.radius = radius;
		this.width = width;
		this.xPos = xPos;
		this.yPos = yPos;
		this.dx = speed;
		this.dy = -speed;
	}

	draw() {
	    ctx.beginPath();
	   	ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false);
	    ctx.lineWidth = globalLineWidth;
	    ctx.strokeStyle = darkBlue;
	    ctx.stroke();
	    ctx.closePath();	
	}

	startAnimation() {
		if(this.xPos + this.dx > canvas.width - this.radius || this.xPos + this.dx < this.radius) {
			this.dx = -this.dx;
		}

		if(this.yPos + this.dy > canvas.height - this.radius || this.yPos + this.dy < this.radius) {
			this.dy = -this.dy;
		}

		this.xPos += this.dx;
		this.yPos += this.dy;
	}
}

class Square {
	constructor(length, xPos, yPos) {
		this.length = length;
		this.xPos = xPos;
		this.yPos = yPos;
		this.dx = speed;
		this.dy = -speed;	
		this.angle = 0;
	}

	draw() {
		const halfLength = this.length / 2;

		ctx.save();
		ctx.beginPath();
		ctx.translate(this.xPos, this.yPos);
	    ctx.rotate(utils.convertToRadians(this.angle += speed));
	    ctx.rect(-halfLength, -halfLength, this.length, this.length);
	    ctx.lineWidth = globalLineWidth;
	    ctx.strokeStyle = darkBlue;
	    ctx.stroke();
	    ctx.closePath();	
	    ctx.restore();
	}

	startAnimation() {
		if(this.xPos + this.dx > canvas.width - this.length || this.xPos + this.dx < this.length) {
			this.dx = -this.dx;
		}

		if(this.yPos + this.dy > canvas.height - this.length || this.yPos + this.dy < this.length) {
			this.dy = -this.dy;
		}

		this.xPos += this.dx;
		this.yPos += this.dy;
	}
}

class Triangle {
	constructor(xVar, yVar, xPos, yPos) {
		this.xVar = xVar;
		this.yVar = yVar;
		this.xPos = xPos;
		this.yPos = yPos;
		this.dx = speed;
		this.dy = -speed;
		this.angle = 0;
	}

	draw() {
		let triangleCoords = {
			firstCoord: {
				x: this.xPos,
				y: this.yPos
			},

			secondCoord: {
				x: this.xPos - this.xVar,
				y: this.yPos + this.yVar
			},

			thirdCoord: {
				x: this.xPos + this.xVar,
				y: this.yPos + this.yVar
			}
		};

		let xCoordsTotal = Object.keys(triangleCoords)
									.map(key => triangleCoords[key].x)
									.reduce((previous, current) => previous + current);									
		let xCoordsAvg = xCoordsTotal / Object.keys(triangleCoords).length;


		let yCoordsTotal = Object.keys(triangleCoords)
									.map(key => triangleCoords[key].y)
									.reduce((previous, current) => previous + current);									
		let yCoordsAvg = yCoordsTotal / Object.keys(triangleCoords).length;


		ctx.save();
	    ctx.beginPath();
	    ctx.translate(xCoordsAvg, yCoordsAvg);
	    ctx.rotate(utils.convertToRadians(this.angle += speed));
	    ctx.translate(-xCoordsAvg, -yCoordsAvg);
	    ctx.fillStyle = darkBlue;
	    ctx.moveTo(triangleCoords.firstCoord.x, triangleCoords.firstCoord.y);
	    ctx.lineTo(triangleCoords.secondCoord.x, triangleCoords.secondCoord.y); 
	    ctx.lineTo(triangleCoords.thirdCoord.x, triangleCoords.thirdCoord.y);
	    ctx.fill();
	    ctx.closePath();
	    ctx.restore();	
	}

	startAnimation() {
		if(this.xPos + this.dx > canvas.width - this.yVar || this.xPos + this.dx < this.yVar) {
			this.dx = -this.dx;
		}

		if(this.yPos + this.dy > canvas.height - this.yVar || this.yPos + this.dy < this.yVar) {
			this.dy = -this.dy;
		}

		this.xPos += this.dx;
		this.yPos += this.dy;
	}
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawShapes(keycode = 10) {
  const numShapes = Math.ceil((keycode / 3) * 1) / 1;

  if (canvas.getContext) {
    // circle    	
 	for(let i = 0; i < numShapes; i++) {
 		let randX = utils.getRandomNum(0, canvas.width);
		let randY = utils.getRandomNum(0, canvas.height);
 		let circle = new Circle(6, 0, randX, randY);

 		circles.push(circle);
    }

    // square	    
	for(let i = 0; i < numShapes; i++) {
		let randX = utils.getRandomNum(0, canvas.width);
	    let randY = utils.getRandomNum(0, canvas.height);
	    let square = new Square(12, randX, randY);

	    squares.push(square);
	}

    // triangle	    
	for(let i = 0; i < numShapes; i++) {
		let randX = utils.getRandomNum(0, canvas.width);
	    let randY = utils.getRandomNum(0, canvas.height);
	    let triangle = new Triangle(10, 12, randX, randY);

	    triangles.push(triangle);
	}
	
	if(initialized === false) {
		executeFrame();
	}
  }
}

function executeFrame() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	for(let i = 0; i < circles.length; i++) {
		let circle = circles[i];
		circle.draw();
		circle.startAnimation();
	}

	for(let i = 0; i < squares.length; i++) {
		let square = squares[i];
		square.draw();
		square.startAnimation();
	}

	for(let i = 0; i < triangles.length; i++) {
		let triangle = triangles[i];
		triangle.draw();
		triangle.startAnimation();
	}

    requestAnimationFrame(executeFrame);
}