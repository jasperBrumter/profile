document.getElementById('darkmode').addEventListener('click', () => {
	body.classList.toggle('darkmode');
	header.classList.toggle('darkmode');
})

const sectionTitles = document.getElementsByClassName('title');
console.log('sectionTitles', sectionTitles);
for (let i = 0; i < sectionTitles.length; i++) {
	const sectionTitle = sectionTitles[i];
	sectionTitle.addEventListener('click', () => {
		const code = sectionTitle.getElementsByTagName('CODE');
		code[0].innerHTML =  code[0].innerHTML.includes('+')
			? code[0].innerHTML.replace('+', '-')
			: code[0].innerHTML.replace('-', '+');
		const section = sectionTitle.parentNode;
		section.getElementsByClassName('underline')[0].classList.toggle('underline-full');
		const parts = section.getElementsByClassName('hidden-section');
		for (let j = 0; j < parts.length; j++) {
			parts[j].classList.toggle('opened');
		}
	});
}