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
			let shapes = new StarsGenerator(keyCode);

			self.insertKeyCode(keyCode);
			self.insertKey(keyCode, key);
			shapes.init();
		});
	}
}

class Star {
	constructor(radius, xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.radius = radius;
		this.svgns = 'http://www.w3.org/2000/svg';
		this.color = '#16243c';
	}

	draw() {
		let star = document.createElementNS(this.svgns, 'circle');
		star.setAttributeNS(null, 'cx', this.xPos);
		star.setAttributeNS(null, 'cy', this.yPos);
		star.setAttributeNS(null, 'r', this.radius);
		star.setAttributeNS(null, 'fill', this.color);

		return star;
	}
}


class StarsGenerator {
	constructor(keycode) {
		this.starsSvg = document.getElementById('js-shapes');
		this.starsRect = this.starsSvg.getBoundingClientRect();
		this.starsSvgWidth = this.starsRect.width;
		this.starsSvgHeight = this.starsRect.height;
		this.keycode = keycode;
	}

	getRandomNum(min, max) {
		return Math.random() * (max - min) + min;
	}

	fullScreenShapesSvg() {
		this.starsSvg.setAttribute('width', window.innerWidth);
		this.starsSvg.setAttribute('height', window.innerHeight);
	}

	insertShapes() {
		const numStars = this.keycode;

		// if svg has stars, clear it out
		if(this.starsSvg.hasChildNodes()) {
			while (this.starsSvg.firstChild) {
			    this.starsSvg.removeChild(this.starsSvg.firstChild);
			}
		}

		// add stars
		for(let i = 0, max = numStars; i < max; i++) {
			let randRadius = this.getRandomNum(1, 4)
			let randX = this.getRandomNum(0, this.starsSvgWidth);
			let randY = this.getRandomNum(0, this.starsSvgHeight);
			let circle = new Star(randRadius, randX, randY);

			this.starsSvg.appendChild(circle.draw());
		}
	}

	init() {
		this.fullScreenShapesSvg();
		this.insertShapes();
	}
}

class Main {
	constructor() {
		let keyCodeDisplay = new KeyCodeDisplay('js-keycode', 'js-key');

		keyCodeDisplay.init();
	}
}

document.addEventListener("DOMContentLoaded", (e) => new Main());