'use strict';

/**
 * On keydown, displays large keycode, key, and generates stars.
 * Number of stars determined by keycode.
 */
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

/**
 * Star parent class.
 */
class LuminousSphere {
	constructor(radius, xPos, yPos, color) {
		this.radius = radius;
		this.xPos = xPos;
		this.yPos = yPos;
		this.color = color;
		this.svgns = 'http://www.w3.org/2000/svg';
	}
}

/**
 * Star creation.
 */
class Star extends LuminousSphere {
	constructor(radius, xPos, yPos, color) {
		super(radius, xPos, yPos, color);
	}

	draw() {
		const star = document.createElementNS(this.svgns, 'circle');

		star.setAttributeNS(null, 'cx', this.xPos);
		star.setAttributeNS(null, 'cy', this.yPos);
		star.setAttributeNS(null, 'r', this.radius);
		star.setAttributeNS(null, 'fill', this.color);

		return star;
	}
}

/**
 * Shooting star creation.
 */
class ShootingStar extends LuminousSphere {
	constructor(xPos, yPos, color) {
		super(xPos, yPos, color);
	}

	draw() {
		const shootingStar = document.createElementNS(this.svgns, '');
	}

	// launch() {		
	// }
}

/**
 * Generates x number of randomly colored, twinkling stars.
 */
class StarsGenerator {
	constructor(keycode) {
		this.starsSvg = document.getElementById('js-stars');
		this.starsRect = this.starsSvg.getBoundingClientRect();
		this.starsSvgWidth = this.starsRect.width;
		this.starsSvgHeight = this.starsRect.height;
		this.keycode = keycode;
		this.svgns = 'http://www.w3.org/2000/svg';
	}

	getRandomNum(min, max) {
		return Math.random() * (max - min) + min;
	}

	getRandomStarColor() {
		const colors = ['#9bb0ff', '#aabfff', '#cad7ff', '#f8f7ff', '#fff4ea', '#ffd2a1', '#ffcc6f']; // obafgkm table
		const randColorIdx = this.getRandomNum(0, colors.length - 1);

		return colors[parseInt(randColorIdx, 10)];
	}

	fullScreenStars() {
		this.starsSvg.setAttribute('width', window.innerWidth);
		this.starsSvg.setAttribute('height', window.innerHeight);
	}

	insertStars() {
		const numStars = this.keycode;
		const g = document.createElementNS(this.svgns, 'g');
		g.classList = 'stars__inner';

		// if svg has stars, clear it out
		if(this.starsSvg.hasChildNodes()) {
			while (this.starsSvg.firstChild) {
			    this.starsSvg.removeChild(this.starsSvg.firstChild);
			}
		}

		// add stars
		for(let i = 0, max = numStars; i < max; i++) {
			let randRadius = this.getRandomNum(0.5, 2.5);
			let randX = this.getRandomNum(0, this.starsSvgWidth);
			let randY = this.getRandomNum(0, this.starsSvgHeight);
			let randColor = this.getRandomStarColor();
			let circle = new Star(randRadius, randX, randY, randColor);

			g.appendChild(circle.draw());
		}

		this.starsSvg.appendChild(g);
	}

	twinkleStars() {
		const stars = document.querySelectorAll('circle') || '';
		const self = this;

		if(stars.length) {
			stars.forEach(star => {
				let randomDelay = self.getRandomNum(0, .75);

				TweenMax.to(star, .5, {autoAlpha: 0.25, repeat: -1, delay: randomDelay, repeatDelay: randomDelay, yoyo: true, ease: Power0.easeNone});
			});
		}
	}

	init() {
		this.fullScreenStars();
		this.insertStars();
		this.twinkleStars();
	}
}

/**
 * Initialize keycode display.
 */
class Main {
	constructor() {
		const keyCodeDisplay = new KeyCodeDisplay('js-keycode', 'js-key');

		keyCodeDisplay.init();
	}
}

document.addEventListener("DOMContentLoaded", (e) => new Main());