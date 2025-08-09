document.addEventListener('DOMContentLoaded', () => {
    // Menú hamburguesa para móviles
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Sombra dinámica en el Header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Carrusel de la galería mostrando 3 imágenes a la vez
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    let currentIndex = 0;
    const visibleCount = 3;

    function showSlides(index) {
        carouselItems.forEach((item, i) => {
            item.style.display = 'none';
            item.classList.remove('active');
        });
        for (let i = 0; i < visibleCount; i++) {
            let showIndex = (index + i) % carouselItems.length;
            carouselItems[showIndex].style.display = 'block';
            carouselItems[showIndex].classList.add('active');
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + visibleCount) % carouselItems.length;
        showSlides(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - visibleCount + carouselItems.length) % carouselItems.length;
        showSlides(currentIndex);
    }

    if (carouselItems.length > 0) {
        showSlides(currentIndex);
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }
    }

    // Cerrar menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });

    // Validación del formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            if (name && email && message) {
                alert('Formulario enviado correctamente.');
                contactForm.reset();
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }
});