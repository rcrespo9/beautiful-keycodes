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
			8: 'delete',
			9: 'tab',
			20: 'caps lock',
			27: 'escape',
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

	keyIdentifierConverter(keyIdentifier) {
		if(keyIdentifier.startsWith('U')) {
			const unicode = keyIdentifier.split('+')[1];

			return String.fromCharCode(parseInt(unicode,16));
		} else {
			return keyIdentifier;
		}
	}

	init() {
		const self = this; // defining this as self in order to refer to internal methods within window event listener

		window.addEventListener('keydown', function(e) {
			const numberEl = self.numberElId;
			const keyCode = e.keyCode;
			const key = e.key || self.keyIdentifierConverter(e.keyIdentifier);
			const shapes = new StarsGenerator(keyCode);

			if(numberEl.style.display.length === 0) {
				numberEl.style.display = 'block';
			}

			self.insertKeyCode(keyCode);
			self.insertKey(keyCode, key);
			shapes.init();
		});
	}
}

/**
 * Star creation.
 */
class Star {
	constructor(radius, xPos, yPos, color) {
		this.radius = radius;
		this.xPos = xPos;
		this.yPos = yPos;
		this.color = color;
		this.svgns = 'http://www.w3.org/2000/svg';
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
		const stars = Array.from(this.starsSvg.querySelectorAll('circle')) || '';
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

document.addEventListener('DOMContentLoaded', (e) => new Main());