const header = document.querySelector('.header');
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
	// Fade-out after 1.2s, remove after .5s
	setTimeout(function () {
		document.getElementById('name-underline').classList.add('underline-full-name');
	}, 100);
	
  	setTimeout(function () {
		document.querySelector('.firstscreen').classList.add('fade');
		header.classList.remove('hidden');
		setTimeout(() => {
			document.querySelector('.firstscreen').classList.add('hidden');
		}, 500);
	}, 1200);
	// For faster development comment replace fade-in speed by uncommenting
		// }, 1);
	// }, 1);
});