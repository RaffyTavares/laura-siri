document.addEventListener('DOMContentLoaded', () => {
    // Manejo del menú de hamburguesa para móviles
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // --- Efecto de sombra dinámica en el Header ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Añadir sombra después de 50px de scroll
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Animaciones de entrada al hacer scroll (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.blog-post, .category-card, .about-content img, .about-text'); // Elementos a animar

    const observerOptions = {
        root: null, // El viewport es el root
        rootMargin: '0px',
        threshold: 0.2 // Cuando el 20% del elemento esté visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento es una tarjeta, escalonar la animación
                if (entry.target.classList.contains('blog-post') || entry.target.classList.contains('category-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.setProperty('--animation-delay', `${index * 0.1}s`); // 0.1s de retraso por tarjeta
                }
                entry.target.classList.add('fade-in'); // Añade la clase que activa la animación
                observer.unobserve(entry.target); // Dejar de observar una vez que se ha animado
            }
        });
    }, observerOptions);

    
    

    // Funcionalidad del carrusel de la galería
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    let currentIndex = 0;

    function showSlide(index) {
        carouselItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentIndex);
    }

    if (carouselItems.length > 0) {
        showSlide(currentIndex);
        if (carouselItems.length > 1) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
            // setInterval(nextSlide, 5000);
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }

    // Cerrar menú móvil al hacer clic en un enlace (si es necesario)
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
            event.preventDefault(); // Evitar el envío del formulario para validación

            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            if (name && email && message) {
                alert('Formulario enviado correctamente.');
                contactForm.reset(); // Limpiar el formulario
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }
});