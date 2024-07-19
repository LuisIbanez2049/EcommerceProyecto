function loadNav() {
    fetch('pages/nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data; //inserta el nav en el html
            highlightCurrentPage(); //esto resalta la pagina actual y añade current, para poder resaltar boton
        });
}

function highlightCurrentPage() {
    const currentPath = window.location.pathname; //obtenemos la ruta
    const navLinks = document.querySelectorAll('nav a');//obtenemos todos los enlaces

    navLinks.forEach(link => { //recorremos los enlaces para encontrar el actual y agregar el current
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath ||
            (linkPath === '/index.html' && currentPath === '/')) {
            link.classList.add('current');
        }
    });
}

window.onload = loadNav; //cargamos el nav al cargar la pagina


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
