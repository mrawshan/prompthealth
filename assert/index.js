'use strict';

//----- On page reload, go to top -----//
window.addEventListener('load', (event) => {
	window.scroll({
		top: 0,
		behavior: 'smooth',
	});
});

//----- Play the video when the user click on the play button -----//
const vidContainer = document.querySelector('.vid-container');
console.log(vidContainer);

const playVideo = function (e, opacity) {
	if (e.target.classList.contains('play-button')) {
		// Getting the button
		const playButton = e.target;

		// Getting the image
		const vidThumbnail = vidContainer.firstElementChild;

		// Getting the video
		const video = vidContainer.children[1];

		// Now do this....
		playButton.style.opacity = this;
		vidThumbnail.style.opacity = this;

		video.play();
		video.setAttribute('controls', '');
	}
};

vidContainer.addEventListener('click', playVideo.bind('0'));

//----- Reveal -----//
const showreel = document.querySelector('.showreel');
const introRow = document.querySelectorAll('.intro .row');
const containerCard = document.querySelector('.get-app .container-card');
const contactUs = document.querySelector('.contact-us .row');

// Reveal function
const reveal = function (element) {
	// CallBack function
	const obsCallback = function (entries, observer) {
		const [entry] = entries; // Destructuring entries Array

		// Guard clause
		if (!entry.isIntersecting) return; // If entry.isIntersecting is false just return, if it's true then run the below line of code
		entry.target.classList.remove('row-hidden');

		observer.unobserve(entry.target); // Unobserve the sections (Stop observing)
	};

	// Creating a new Intersection Observer
	const observer = new IntersectionObserver(obsCallback, {
		root: null,
		threshold: 0.15,
	});

	// Checking element argument is a NodeList or not
	if (NodeList.prototype.isPrototypeOf(element)) {
		// If it's a NodeList then do this
		element.forEach(function (el) {
			observer.observe(el);
			el.classList.add('row-hidden'); // Adding row-hidden class to all the elements
		});
	} else {
		observer.observe(element);
	}
};

// Calling the reveal function
reveal(showreel);
reveal(introRow);
reveal(containerCard);
reveal(contactUs);

//----- Lazzy loading images -----//
const imgTargets = document.querySelectorAll('img[data-src]'); // Select all the images which has the property of data-src
// console.log(imgTargets);

// CallBack function
const loadImg = function (entries, observer) {
	const [entry] = entries;

	// Guard clause
	if (!entry.isIntersecting) return; // If entry.isIntersecting is false just return, if it's true then run the below line of code

	// Replace the src attribute with data-src
	entry.target.src = entry.target.dataset.src;

	// After the load event, remove lazy-img class
	entry.target.addEventListener('load', function () {
		entry.target.classList.remove('lazy-img');
	});

	observer.unobserve(entry.target); // Stop observing
};

// Creating a new Intersection Observer
const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0,
	rootMargin: '200px',
});

// Observing the target imgs
imgTargets.forEach((img) => imgObserver.observe(img));
