let carouselImages = document.querySelectorAll('.carousel-image');
let currentImageIndex = 0;

setInterval(() => {
    carouselImages[currentImageIndex].style.opacity = '0';
    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    carouselImages[currentImageIndex].style.opacity = '1';
}, 5000);



const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});    