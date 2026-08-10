// HERO: TEXTO DINÁMICO
const slides = document.querySelectorAll('.slide');
const dynamicServiceText = document.getElementById('dynamic-service');

const servicesData = [
    { text: "REPARACIÓN", color: "#e63946" },
    { text: "INSTALACIÓN", color: "#4cc9f0" },
    { text: "MANTENIMIENTO", color: "#06d6a0" },
    { text: "DISTRIBUCIÓN", color: "#ffd166" }
];

let currentIndex = 0;

function nextSlideAndText() {
    dynamicServiceText.classList.add('fade-out');
    setTimeout(() => {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');

        dynamicServiceText.textContent = servicesData[currentIndex].text;
        dynamicServiceText.style.color = servicesData[currentIndex].color;

        dynamicServiceText.classList.remove('fade-out');
        dynamicServiceText.classList.add('fade-in');

        setTimeout(() => {
            dynamicServiceText.classList.remove('fade-in');
        }, 500);
    }, 500);
}
setInterval(nextSlideAndText, 4000);


// NAVEGACIÓN STICKY
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// MENÚ HAMBURGUESA
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-right nav ul li a');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});


/* ----------------------------------------------------
   CARRUSEL AUTOMÁTICO PROFESIONAL (SWIPER)
   Resuelve el efecto visual de rebote y es 100% responsivo
------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.trayectoria-swiper', {
            loop: true,                 // Bucle verdaderamente infinito (sin regreso de golpe)
            centeredSlides: true,       // La imagen central siempre activa
            slidesPerView: 1,           // Mostrar 1 a la vez en celulares
            spaceBetween: 20,           // Espacio entre imágenes
            speed: 800,                 // Velocidad de transición suave y elegante
            autoplay: {
                delay: 3500,            // Cambia cada 3.5 segundos
                disableOnInteraction: false, // No detener el autoplay si el usuario da clic
            },
            navigation: {
                nextEl: '.t-next',
                prevEl: '.t-prev',
            },
            breakpoints: {
                768: {                  // Tabletas y computadoras
                    slidesPerView: 3,   // Mostrar 3 imágenes a la vez
                    spaceBetween: 40,
                }
            }
        });
    }
});


// MANEJO DE FORMULARIO DE CONTACTO - ENVIAR A WHATSAPP
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        const numeroWhatsApp = "525515037612";

        const texto = `Hola, vengo de la página web.%0A%0A*Nombre:* ${nombre}%0A*Correo:* ${correo}%0A*Teléfono:* ${telefono}%0A*Mensaje:* ${mensaje}`;

        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${texto}`;
        window.open(urlWhatsApp, '_blank');

        this.reset();
    });
}