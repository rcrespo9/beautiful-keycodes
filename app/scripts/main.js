'use strict';

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

class Shape {
	constructor(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.svgns = 'http://www.w3.org/2000/svg';
		this.globalLineWidth = 3;
		this.darkBlue = '#16243c';
	}
}

class Square extends Shape {
	constructor(sideLength, xPos, yPos) {
		super(xPos, yPos);
		this.sideLength = sideLength;
	}

	draw() {
		let square = document.createElementNS(this.svgns, 'rect');
		square.setAttributeNS(null, 'x', this.xPos);
		square.setAttributeNS(null, 'y', this.yPos);
		square.setAttributeNS(null, 'width', this.sideLength);
		square.setAttributeNS(null, 'height', this.sideLength);
		square.setAttributeNS(null, 'stroke', this.darkBlue);
		square.setAttributeNS(null, 'stroke-width', this.globalLineWidth);
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
		let circle = document.createElementNS(this.svgns, 'circle');
		circle.setAttributeNS(null, 'cx', this.xPos);
		circle.setAttributeNS(null, 'cy', this.yPos);
		circle.setAttributeNS(null, 'r', this.radius);
		circle.setAttributeNS(null, 'stroke', this.darkBlue);
		circle.setAttributeNS(null, 'stroke-width', this.globalLineWidth);
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

	coordinatesAvg(obj, coordinate) {
		let total = Object.keys(obj)
							.map(key => obj[key][coordinate])
							.reduce((previous, current) => previous + current);

		let avg = total / Object.keys(obj).length;

		return avg;
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

		// let xCoordsAvg = this.coordinatesAvg(triangleCoords, 'x');
		// let yCoordsAvg = this.coordinatesAvg(triangleCoords, 'y');

		let triangle = document.createElementNS(this.svgns, 'polygon');
		// triangle.setAttributeNS(null, 'transform', `translate(${xCoordsAvg} ${yCoordsAvg}) rotate(45 ${xCoordsAvg} ${yCoordsAvg})`);
		triangle.setAttributeNS(null, 'points', `${triangleCoords.firstCoord.x},${triangleCoords.firstCoord.y} ${triangleCoords.secondCoord.x},${triangleCoords.secondCoord.y} ${triangleCoords.thirdCoord.x},${triangleCoords.thirdCoord.y}`);
		triangle.setAttributeNS(null, 'fill', this.darkBlue);

		return triangle;
	}
}

class ShapesGenerator {
	constructor(numShapes) {
		this.shapesSvg = document.getElementById('js-shapes');
		this.shapesRect = this.shapesSvg.getBoundingClientRect();
		this.shapesSvgWidth = this.shapesRect.width;
		this.shapesSvgHeight = this.shapesRect.height;
		this.numShapes = numShapes;
	}

	getRandomNum(min, max) {
		return Math.random() * (max - min) + min;
	}

	fullScreenShapesSvg() {
		this.shapesSvg.setAttribute('width', window.innerWidth);
		this.shapesSvg.setAttribute('height', window.innerHeight);
	}

	buildShapes() {
		// const square = new Square(12, utils.getRandomNum(0, shapesRect.width), utils.getRandomNum(0, shapesRect.height));
		// shapes.appendChild(square.draw());

		// const circle = new Circle(6, utils.getRandomNum(0, shapesRect.width), utils.getRandomNum(0, shapesRect.height));
		// shapes.appendChild(circle.draw());

		// const triangle = new Triangle(10, 12, utils.getRandomNum(0, shapesRect.width), utils.getRandomNum(0, shapesRect.height));
		// shapes.appendChild(triangle.draw());
	}

	init() {
		this.fullScreenShapesSvg();
		this.buildShapes();
	}
}

class Main {
	constructor() {
		let keyCodeDisplay = new KeyCodeDisplay('js-keycode', 'js-key');
		keyCodeDisplay.init();
	}
}

document.addEventListener("DOMContentLoaded", (e) => new Main());