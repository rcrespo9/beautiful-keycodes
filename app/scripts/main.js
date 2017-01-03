'use strict';
const globalLineWidth = 3;
const darkBlue = '#16243c';
const speed = 2;
let circles = [];
let squares = [];
let triangles = [];

const utils = {
	getRandomNum: (min, max) => {
		return Math.random() * (max - min) + min;
	},

	convertToRadians: (degree) => {
		return degree * (Math.PI / 180);
	}
}

class KeyCodeDisplay {
	constructor(numberElId, textElId) {
		this.numberElId = document.getElementById(numberElId);
		this.textElId = document.getElementById(textElId);
	}

	keyFormatter(keycode, key) {
		const specialKeys = {
			20: 'caps lock',
			32: 'spacebar',
			37: 'arrow left',
			38: 'arrow up',
			39: 'arrow right',
			40: 'arrow down'
		};

		if(specialKeys[keycode]) {
			return specialKeys[keycode];
		} else {
			return key;
		}
	}

	insertKeyCode(keycode) {
		this.numberElId.innerHTML = keycode;
	}

	insertKey(keycode, key) {
		this.textElId.innerHTML = this.keyFormatter(keycode, key);
	}

	init() {
		const self = this; // defining this as self in order to refer to internal methods within window event listener

		window.addEventListener('keydown', function(e) {
			let keyCode = e.keyCode;
			let key = e.key;

			self.insertKeyCode(keyCode);
			self.insertKey(keyCode, key);
		});
	}
}

const shapes = document.getElementById('js-shapes');
shapes.setAttribute('width', window.innerWidth);
shapes.setAttribute('height', window.innerHeight);

const shapesRect = shapes.getBoundingClientRect();

const svgns = "http://www.w3.org/2000/svg";

class Shape {
	constructor(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
	}
}

class Square extends Shape {
	constructor(sideLength, xPos, yPos) {
		super(xPos, yPos);
		this.sideLength = sideLength;
	}

	draw() {
		let square = document.createElementNS(svgns, 'rect');
		square.setAttributeNS(null, 'x', this.xPos);
		square.setAttributeNS(null, 'y', this.yPos);
		square.setAttributeNS(null, 'width', this.sideLength);
		square.setAttributeNS(null, 'height', this.sideLength);
		square.setAttributeNS(null, 'stroke', darkBlue);
		square.setAttributeNS(null, 'stroke-width', globalLineWidth);
		square.setAttributeNS(null, 'fill', 'none');

		return square;
	}
}

class Circle extends Shape {
	constructor(radius, xPos, yPos) {
		super(xPos, yPos);
		this.radius = radius;
	}

	draw() {
		let circle = document.createElementNS(svgns, 'circle');
		circle.setAttributeNS(null, 'cx', this.xPos);
		circle.setAttributeNS(null, 'cy', this.yPos);
		circle.setAttributeNS(null, 'r', this.radius);
		circle.setAttributeNS(null, 'stroke', darkBlue);
		circle.setAttributeNS(null, 'stroke-width', globalLineWidth);
		circle.setAttributeNS(null, 'fill', 'none');

		return circle;
	}
}

class Triangle extends Shape {
	constructor(xVar, yVar, xPos, yPos) {
		super(xPos, yPos);
		this.xVar = xVar;
		this.yVar = yVar;
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

		let triangle = document.createElementNS(svgns, 'polygon');
		triangle.setAttributeNS(null, 'transform', `translate(${xCoordsAvg} ${yCoordsAvg}) rotate(45 ${xCoordsAvg} ${yCoordsAvg})`);
		triangle.setAttributeNS(null, 'points', `${triangleCoords.firstCoord.x},${triangleCoords.firstCoord.y} ${triangleCoords.secondCoord.x},${triangleCoords.secondCoord.y} ${triangleCoords.thirdCoord.x},${triangleCoords.thirdCoord.y}`);
		triangle.setAttributeNS(null, 'fill', darkBlue);

		return triangle;
	}
}

const square = new Square(12, utils.getRandomNum(0, shapesRect.width), utils.getRandomNum(0, shapesRect.height));
shapes.appendChild(square.draw());

const circle = new Circle(6, utils.getRandomNum(0, shapesRect.width), utils.getRandomNum(0, shapesRect.height));
shapes.appendChild(circle.draw());

const triangle = new Triangle(10, 12, utils.getRandomNum(0, shapesRect.width), utils.getRandomNum(0, shapesRect.height));
shapes.appendChild(triangle.draw());

class Main {
	constructor() {
		let keyCodeDisplay = new KeyCodeDisplay('js-keycode', 'js-key');
		keyCodeDisplay.init();
	}
}

document.addEventListener("DOMContentLoaded", (e) => new Main());