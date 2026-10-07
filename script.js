document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. ANIMACIÓN REVEAL AL HACER SCROLL
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // ==========================================
    // 2. TEXTO DINÁMICO HERO (Palabras cambiantes)
    // ==========================================
    const dynamicText = document.getElementById('dynamic-text');
    if (dynamicText) {
        const words = [
            { text: "REPARACIÓN", color: "#D32F2F" },
            { text: "INSTALACIÓN", color: "#1565C0" },
            { text: "MANTENIMIENTO", color: "#2E7D32" },
            { text: "DISTRIBUCIÓN", color: "#F57C00" }
        ];
        let wordIndex = 0;

        setInterval(() => {
            dynamicText.classList.add('fade-out');

            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                dynamicText.textContent = words[wordIndex].text;
                dynamicText.style.color = words[wordIndex].color;

                dynamicText.classList.remove('fade-out');
                dynamicText.classList.add('fade-in');

                setTimeout(() => {
                    dynamicText.classList.remove('fade-in');
                }, 400);
            }, 400);
        }, 3000);
    }

    // ==========================================
    // 3. SLIDESHOW DEL HERO (Fondo)
    // ==========================================
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentIndex = 0;
        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 6000);
    }

    // ==========================================
    // 4. HEADER STICKY 
    // ==========================================
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 5. MENÚ HAMBURGUESA PARA CELULARES
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-right nav ul li a');

    if (mobileMenuBtn && navMenu) {
        const toggleMenu = () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');

            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
                document.body.style.overflow = '';
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // 6. CARROUSEL DE NOSOTROS (SWIPER JS)
    // ==========================================
    if (typeof Swiper !== 'undefined') {
        new Swiper('.trayectoria-swiper', {
            effect: 'fade',
            fadeEffect: { crossFade: true },
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    }

    // ==========================================
    // 7. WIDGET DE WHATSAPP REALISTA
    // ==========================================
    const waTimeElement = document.getElementById('wa-time');
    if (waTimeElement) {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        waTimeElement.textContent = hours + ':' + minutes + ' ' + ampm;
    }

    const closeWaBtn = document.getElementById('close-wa');
    const waTooltip = document.getElementById('wa-tooltip');

    if (closeWaBtn && waTooltip) {
        closeWaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            waTooltip.style.transform = 'scale(0)';
            waTooltip.style.opacity = '0';
            setTimeout(() => {
                waTooltip.style.display = 'none';
            }, 400);
        });
    }

    // ==========================================
    // 8. LÓGICA DEL BANNER DE COOKIES
    // ==========================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const rejectCookiesBtn = document.getElementById('reject-cookies');

    if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000); // 2 segundos de retraso para no ser invasivo
    }

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    if (rejectCookiesBtn) {
        rejectCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'false');
            cookieBanner.classList.remove('show');
        });
    }
});