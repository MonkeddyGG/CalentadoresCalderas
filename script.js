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


/* CARRUSEL AUTOMÁTICO (Izquierda a Derecha) */
const tTrack = document.getElementById('t-track');
const tPrev = document.getElementById('t-prev');
const tNext = document.getElementById('t-next');
const tItems = document.querySelectorAll('.t-slide-item');

if (tTrack && tItems.length > 0) {
    let tIndex = 0;
    let itemsPerView = window.innerWidth >= 768 ? 3 : 1;

    function updateCarousel() {
        const itemWidth = tItems[0].clientWidth;
        tTrack.style.transform = `translateX(-${tIndex * itemWidth}px)`;
    }

    // Mueve el carrusel para que las imágenes fluyan hacia la derecha (avanzar)
    function autoScrollRight() {
        if (tIndex < tItems.length - itemsPerView) {
            tIndex++;
        } else {
            // Regresa al inicio
            tIndex = 0;
        }
        updateCarousel();
    }

    function moveToPrev() {
        if (tIndex > 0) {
            tIndex--;
        } else {
            tIndex = tItems.length - itemsPerView;
        }
        updateCarousel();
    }

    // Intervalo Automático cada 3 Segundos
    let autoPlayInterval = setInterval(autoScrollRight, 3000);

    // Reinicia el contador si el usuario interactúa manualmente
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(autoScrollRight, 3000);
    }

    tNext.addEventListener('click', () => {
        autoScrollRight();
        resetAutoPlay();
    });

    tPrev.addEventListener('click', () => {
        moveToPrev();
        resetAutoPlay();
    });

    window.addEventListener('resize', () => {
        itemsPerView = window.innerWidth >= 768 ? 3 : 1;
        if (tIndex > tItems.length - itemsPerView) {
            tIndex = Math.max(0, tItems.length - itemsPerView);
        }
        updateCarousel();
    });
}

// MANEJO DE FORMULARIO DE CONTACTO - ENVIAR A WHATSAPP
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita recargar la página

        // Obtener los datos de los inputs
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        // Número de WhatsApp al que llegará (con código de México 52)
        const numeroWhatsApp = "525515037612";

        // Crear el texto del mensaje con saltos de línea (%0A)
        const texto = `Hola, vengo de la página web.%0A%0A*Nombre:* ${nombre}%0A*Correo:* ${correo}%0A*Teléfono:* ${telefono}%0A*Mensaje:* ${mensaje}`;

        // Crear el link de WhatsApp y abrirlo en una nueva pestaña
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${texto}`;
        window.open(urlWhatsApp, '_blank');

        // Limpiar el formulario después de enviarlo
        this.reset();
    });
}