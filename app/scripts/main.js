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

// const particles = document.getElementById('js-particles');
// var svgns = "http://www.w3.org/2000/svg";

// for (var i = 0; i < 100; i++) {
//     var x = Math.random() * 5000,
//         y = Math.random() * 3000;

//     var rect = document.createElementNS(svgns, 'rect');
//     rect.setAttributeNS(null, 'x', x);
//     rect.setAttributeNS(null, 'y', y);
//     rect.setAttributeNS(null, 'height', '50');
//     rect.setAttributeNS(null, 'width', '50');
//     rect.setAttributeNS(null, 'stroke', '3');
//     particles.appendChild(rect);
// }

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
		// shapes.appendChild(square);

		return square;
	}
}

let randX = utils.getRandomNum(0, shapesRect.width);
let randY = utils.getRandomNum(0, shapesRect.height);

const square = new Square(12, randX, randY);
shapes.appendChild(square.draw());

class Main {
	constructor() {
		let keyCodeDisplay = new KeyCodeDisplay('js-keycode', 'js-key');
		keyCodeDisplay.init();
	}
}

document.addEventListener("DOMContentLoaded", (e) => new Main());