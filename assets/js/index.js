let carouselImages = document.querySelectorAll('.carousel-image');
let currentImageIndex = 0;

setInterval(() => {
    carouselImages[currentImageIndex].style.opacity = '0';
    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    carouselImages[currentImageIndex].style.opacity = '1';
}, 5000);

const mainnav = document.querySelector('.navLinks')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
}); 

let slideIndex = 0;
function showSlides() {
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;//ajusta la transicion de la imagen a la derecha 
}

function moveSlides(n) {
    const slides = document.querySelectorAll('.slide');
    slideIndex += n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlides();
}

function autoMoveSlides() {
    moveSlides(1);
}

// Show the first slide initially
showSlides();

// Set interval for automatic slide movement
setInterval(autoMoveSlides, 5000); // Change slide every 5 seconds


