// SCRIPT DEL CARRUSEL DE IMÁGENES (HERO)
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Cambia de imagen cada 5 segundos
setInterval(nextSlide, 5000);


// SCRIPT PARA EL MENÚ PEGAJOSO Y REDUCCIÓN DE TAMAÑO
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// SCRIPT PARA EL MENÚ HAMBURGUESA EN MÓVILES
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-right nav ul li a');

// Abrir/Cerrar menú al tocar el icono
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Cambiar el icono de barras a "X"
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Cerrar el menú automáticamente cuando se hace clic en un enlace (útil en móviles)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});