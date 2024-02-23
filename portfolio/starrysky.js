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