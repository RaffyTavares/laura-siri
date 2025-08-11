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

    // Carrusel responsivo
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    let currentIndex = 0;

    function getVisibleCount() {
        if (window.innerWidth <= 768) return 2;      // móvil
        if (window.innerWidth <= 1024) return 3;     // tablet
        return 4;                                    // escritorio
    }

    function showSlides(index) {
        const visibleCount = getVisibleCount();
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
        const visibleCount = getVisibleCount();
        currentIndex = (currentIndex + visibleCount) % carouselItems.length;
        showSlides(currentIndex);
    }

    function prevSlide() {
        const visibleCount = getVisibleCount();
        currentIndex = (currentIndex - visibleCount + carouselItems.length) % carouselItems.length;
        showSlides(currentIndex);
    }

    if (carouselItems.length > 0) {
        showSlides(currentIndex);
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }
        window.addEventListener('resize', () => {
            showSlides(currentIndex);
        });
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

    // Envío de WhatsApp
    function sendWhatsApp(event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Reemplaza por tu número de WhatsApp con código de país, ejemplo: 549XXXXXXXXXX
        const phone = '18293012054';

        const text = `Hola Laura Siri! 👋%0AMi nombre es: ${name}%0AMi correo: ${email}%0AMensaje: ${message}`;
        const url = `https://wa.me/${phone}?text=${text}`;

        window.open(url, '_blank');
        return false;
    }
});