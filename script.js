document.addEventListener('DOMContentLoaded', () => {

    // HERO: TEXTO DINÁMICO
    const slides = document.querySelectorAll('.slide');
    const dynamicServiceText = document.getElementById('dynamic-service');

    if (slides.length > 0 && dynamicServiceText) {
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
    }

    // NAVEGACIÓN STICKY
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // MENÚ HAMBURGUESA
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-right nav ul li a');

    if (mobileMenuBtn && navMenu) {
        const toggleMenu = () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');

            const isExpanded = navMenu.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);

            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);
        mobileMenuBtn.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // CARRUSEL AUTOMÁTICO (Efecto Coverflow 3D)
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.trayectoria-swiper', {
            effect: 'coverflow', // El efecto visual más agradable y profesional
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            speed: 1000,
            coverflowEffect: {
                rotate: 20, // Rotación lateral suave
                stretch: 0,
                depth: 300, // Profundidad para que las del fondo se vean más atrás
                modifier: 1,
                slideShadows: true,
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.t-next',
                prevEl: '.t-prev',
            },
        });
    }
});