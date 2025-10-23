const setupStackCarousel = () => {
    const container = document.getElementById('stack-carousel');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.card-item'));
    const totalCards = cards.length;
    let activeIndex = 0;
    const transitionDuration = 600;

    const updateClasses = () => {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'stack-2', 'stack-3', 'hidden', 'puxando');

            let position = (index - activeIndex + totalCards) % totalCards;

            if (position === 0) {
                card.classList.add('active');
                card.style.zIndex = 10;
            } else if (position === 1) {
                card.classList.add('stack-2');
                card.style.zIndex = 9;
            } else if (position === 2) {
                card.classList.add('stack-3');
                card.style.zIndex = 8;
            } else {
                card.classList.add('hidden');
                card.style.zIndex = 1;
            }
        });
    };

    const nextCard = (currentCardElement) => {
        container.style.pointerEvents = 'none';

        currentCardElement.classList.add('puxando');
        currentCardElement.classList.remove('active');

        activeIndex = (activeIndex + 1) % totalCards;

        setTimeout(() => {
            currentCardElement.classList.remove('puxando');
            updateClasses();
            container.style.pointerEvents = 'auto';
        }, transitionDuration);
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('active')) {
                nextCard(card);
            }
        });
    });
    
    updateClasses();
};

document.addEventListener('DOMContentLoaded', () => {

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
        });
    }

    setupStackCarousel();


    const menuButton = document.getElementById('menu-button');
    const mobileMenuContainer = document.getElementById('mobile-menu-container');

    if (menuButton && mobileMenuContainer) {
        menuButton.addEventListener('click', () => {
            mobileMenuContainer.classList.toggle('hidden');

            const icon = menuButton.querySelector('i');
            if (mobileMenuContainer.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });

        mobileMenuContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuContainer.classList.add('hidden');
                menuButton.querySelector('i').classList.remove('fa-times');
                menuButton.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    const container = document.querySelector('.perfil-3d-container');
    const img = document.getElementById('perfil-img');

    if (container && img) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const tiltY = ((mouseX - centerX) / centerX) * 10;
            const tiltX = ((mouseY - centerY) / centerY) * -10;

            img.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;

            const lightX = ((mouseX - centerX) / centerX) * 20;
            const lightY = ((mouseY - centerY) / centerY) * 20;

            container.style.boxShadow = `
                ${-lightX}px ${-lightY}px 40px rgba(74, 222, 128, 0.4),
                ${lightX / 2}px ${lightY / 2}px 10px rgba(253, 252, 252, 0.99)
            `;
        });

        container.addEventListener('mouseleave', () => {
            img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            container.style.boxShadow = '0 20px 25px -5px rgba(74, 222, 128, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
    }


    const backToTopButton = document.getElementById('back-to-top');
    

    if (backToTopButton) {
        const toggleVisibility = () => {
            if (window.scrollY > 600) {
                backToTopButton.classList.remove('scale-0', 'opacity-0');
                backToTopButton.classList.add('scale-100', 'opacity-100');
            } else {
                backToTopButton.classList.remove('scale-100', 'opacity-100');
                backToTopButton.classList.add('scale-0', 'opacity-0');
            }
        };

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        window.addEventListener('scroll', toggleVisibility);
        backToTopButton.addEventListener('click', scrollToTop);

        toggleVisibility();
    }
});