	// Set Date for label
	const today = new Date();
	const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	const st = [1, 21, 31];
	const nd = [2, 22];
	const rd = [3, 23];
	const day = today.getDate();
	let denomination = 'th';
	if (st.includes(day)) {
		denomination = 'st';
	} else if (nd.includes(day)) {
		denomination = 'nd';
	} else if (rd.includes(day)) {
		denomination = 'rd';
	}
	document.getElementById('date')
		.innerHTML = `${months[today.getMonth()]} ${day}${denomination} ${today.getFullYear()}`;


// Newer integration using canvas and requestAnimationFrame instead of IIFE
	const sky = document.getElementById('sky');
	const ctx = sky.getContext('2d');

	// Static layer (gradient + stars) is drawn once per resize, then copied each frame
	const staticLayer = document.createElement('canvas');
	const staticCtx = staticLayer.getContext('2d');


	// Generating stars, scattered over a square of 1.5x the window width
	const width = window.innerWidth * 1.5;
	let numberOfStars = 3000
	if (width < 1000) {
		numberOfStars = 1000;
	} else if (width < 2000) {
		numberOfStars = 2000;
	}
	const stars = [];
	for (let i = 0; i < numberOfStars; i++) {
		const color = 100 + Math.floor(Math.random() * 155);
		const sizeDraw = Math.random() * 100;
		let size = 1;
		if (sizeDraw > 95) {
			size = 3;
		} else if (sizeDraw > 75) {
			size = 2;
		}
		stars.push({
			x: Math.random() * width,
			y: Math.random() * width,
			size,
			color: `rgb(${color},${color},${color})`,
		});
	}


	// Shooting star: 10 dots growing from 0px to 3px, positions in % of the sky
	const shootingStars = [];
	for (let i = 0; i < 10; i++) {
		shootingStars.push({ x: -10 + (i / 2), y: 50, size: i / 3 });
	}
	let speedX = 0;
	let speedY = 0;
	// The original loop moved the dots once per 4ms timer tick; speeds are in % per tick
	const TICK_MS = 4;


	const drawStaticLayer = (w, h, dpr) => {
		staticLayer.width = w * dpr;
		staticLayer.height = h * dpr;
		staticCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

		const gradient = staticCtx.createLinearGradient(0, 0, 0, h);
		gradient.addColorStop(0, 'rgb(0, 0, 30)');
		gradient.addColorStop(1, 'rgb(90, 90, 250)');
		staticCtx.fillStyle = gradient;
		staticCtx.fillRect(0, 0, w, h);

		stars.forEach(({ x, y, size, color }) => {
			if (x > w || y > h) {
				return;
			}
			staticCtx.fillStyle = color;
			staticCtx.beginPath();
			staticCtx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
			staticCtx.fill();
		});
	};

	const resize = () => {
		const dpr = window.devicePixelRatio || 1;
		const w = sky.clientWidth;
		const h = sky.clientHeight;
		if (w === 0 || h === 0) {
			return;
		}
		sky.width = w * dpr;
		sky.height = h * dpr;
		drawStaticLayer(w, h, dpr);
	};

	const draw = () => {
		const w = sky.clientWidth;
		const h = sky.clientHeight;
		const dpr = window.devicePixelRatio || 1;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.drawImage(staticLayer, 0, 0);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

		ctx.fillStyle = 'rgb(220,220,220)';
		shootingStars.forEach(({ x, y, size }) => {
			if (size === 0) {
				return;
			}
			ctx.beginPath();
			ctx.arc(x / 100 * w + size / 2, y / 100 * h + size / 2, size / 2, 0, Math.PI * 2);
			ctx.fill();
		});
	};


	// Moving shooting stars, frame-rate independent
	let lastTime = null;
	const animate = (time) => {
		if (lastTime !== null) {
			// Cap the step so the meteor doesn't jump after the tab was in the background
			const ticks = Math.min(time - lastTime, 50) / TICK_MS;
			shootingStars.forEach((shootingStar) => {
				shootingStar.x += speedX * ticks;
				shootingStar.y += speedY * ticks;
			});
		}
		lastTime = time;
		draw();
		requestAnimationFrame(animate);
	};


	// Launching a new shooting star from a random side, height and angle
	const launch = () => {
		if (Math.random() < .5) {
			speedY = -1 + Math.random()
		}
		else {
			speedY = Math.random()
		}
		const top = Math.random() * 100;
		if (Math.random() < .5) {
			shootingStars.forEach((shootingStar, i) => {
				shootingStar.x = -10 + (i / 2);
				shootingStar.y = top + (speedY * i / 4);
			});
			speedX = 1 + Math.random()
		}
		else {
			shootingStars.forEach((shootingStar, i) => {
				shootingStar.x = 110 - (i / 2);
				shootingStar.y = top + (speedY * i / 4);
			});
			speedX = -2 + Math.random()
		}
		setTimeout(launch, 2000 + Math.random() * 5000);
	};


	// Watch the canvas itself: the sky's CSS loads after this script, so its size changes after load
	new ResizeObserver(resize).observe(sky);
	// Zoom or moving to another screen can change the pixel ratio without changing the size
	window.addEventListener('resize', resize);
	requestAnimationFrame(animate);
	setTimeout(launch, 2000);


/*
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------
 LEGACY: DOM-based sky (replaced by the canvas version above, October 2026)
______________________________________________________________________________________________________
------------------------------------------------------------------------------------------------------

	The sky used to be built from <div>s: one absolutely positioned div per star (1000 to 3000 of
	them) and 10 more for the shooting star, all inside <div class="sky">.

	It was rewritten to draw on a <canvas> because it was demanding on phones:
	- Thousands of DOM nodes cost memory and make every style recalculation and layout slower.
	- The shooting star moved by rewriting style.left / style.top, forcing a layout on every step.
	- The loop used setTimeout(fn, 1), so it ran ~250 times per second, never paused in a background
	  tab and kept the CPU (and battery) busy even while the meteor was off-screen.

	The canvas version draws the gradient and stars once onto an offscreen canvas, then copies it
	and draws only the 10 meteor dots each frame with requestAnimationFrame, which matches the
	screen's refresh rate and pauses automatically when the tab is hidden.

	The original code is kept below for reference. It needed this markup and CSS:

	<div class="sky" id="sky"></div>

	.sky {
		width: 100%;
		height: 70vh;
		min-height: 500px;
		background-image: linear-gradient(rgb(0, 0, 30), rgb(90, 90, 250));
		background-attachment: fixed;
		position: relative;
		overflow: hidden;
	}
	.star {
		position: absolute;
		border-radius: 50%;
	}
	.shootingStar {
		position: absolute;
		border-radius: 50%;
		background-color: white;
	}

	// Adding stars to the sky
	const sky = document.getElementById('sky');
	const width = window.innerWidth * 1.5;
	const speedX_slow = 0.3;
	let numberOfStars = 3000
	if (width < 1000) {
		numberOfStars = 1000;
	} else if (width < 2000) {
		numberOfStars = 2000;
	}
	for (let i = 0; i < numberOfStars; i++) {
		const star = document.createElement('div');
		star.className = 'star';
		star.style.left = `${Math.random() * width}px`;
		star.style.top = `${Math.random() * width}px`;
		const color = 100 + Math.floor(Math.random() * 155);
		const sizeDraw = Math.random() * 100;
		let size = '1px';
		if (sizeDraw > 95) {
			size = '3px';
		} else if (sizeDraw > 75) {
			size = '2px';
		}
		star.style.backgroundColor = `rgb(${color},${color},${color})`;
		star.style.height = size;
		star.style.width = size;
		sky.appendChild(star);
	}


	// Adding shooting stars
	for (let i = 0; i < 10; i++) {
		const shootingStar = document.createElement('div');
		shootingStar.className = 'shootingStar';
		shootingStar.style.left = `${-10 + (i / 2)}%`;
		shootingStar.style.top = `50%`;
		const sizeDraw = Math.random() * 100;
		let size = `${i / 3}px`
		shootingStar.style.backgroundColor = 'rgb(220,220,220)';
		shootingStar.style.height = size;
		shootingStar.style.width = size;
		sky.appendChild(shootingStar);
	}

	var shootingStars = document.querySelectorAll('.shootingStar');
	var speedX = 1 + Math.random()
	var speedY = Math.random()

	// Moving shooting stars
	setTimeout(function () {
		for (var i = 0; i < shootingStars.length; i++) {
			var curPosX = shootingStars[i].style.left;
			curPosX = curPosX.split('%')[0];
			curPosX = parseFloat(curPosX) + speedX;
			curPosX = curPosX.toString() + '%';
			shootingStars[i].style.left=curPosX;
			var curPosY = shootingStars[i].style.top;
			curPosY = curPosY.split('%')[0];
			curPosY = parseFloat(curPosY) + speedY;
			curPosY = curPosY.toString() + '%';
			shootingStars[i].style.top=curPosY;
		}
	    setTimeout(arguments.callee, 1);
	}, 2000);

	// IIFE for randomizing speed
	(function(){
		if (Math.random() < .5) {
			speedY = -1 + Math.random()
		}
		else {
			speedY = Math.random()
		}
		if (Math.random() < .5) {
			var top = (Math.random() * 100)
			for (var i = 0; i < shootingStars.length; i++) {
				shootingStars[i].style.left = (-10 +(i/2.0)).toString() + '%';
				shootingStars[i].style.top = (top + (speedY * i/4)).toString() + '%';
			}
			speedX = 1 + Math.random()

		}
		else {
			var top = (Math.random() * 100)
			for (var i = 0; i < shootingStars.length; i++) {
				shootingStars[i].style.left = (110 -(i/2.0)).toString() + '%';
				shootingStars[i].style.top = (top + (speedY * i/4)).toString() + '%';
			}
			speedX = -2 + Math.random()
		}
	    setTimeout(arguments.callee, 2000 + Math.random() * 5000);
	})();
*/
