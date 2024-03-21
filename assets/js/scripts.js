document.addEventListener("DOMContentLoaded", function() {
    const initSlider = () => {
        const swiper = new Swiper('.slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            lazy: true,
            breakpoints: {
                460: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                }
            }
        });
        swiper.el.onmouseover = () => {
            swiper.autoplay.stop();
        }
        swiper.el.onmouseleave = () => {
            swiper.autoplay.start();
        }
    }

    const initBurgerMenu = () => {
        const menuBtn = document.querySelector('.burger-button');
        const menu = document.querySelector('.burger-menu');
        const body = document.querySelector('body');
        const menuLinks = document.querySelectorAll('.burger-menu a');
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
            body.classList.toggle('no-scroll');
            menuBtn.classList.toggle('open');
            if (menu.classList.contains('active')) {
                menuLinks.forEach(link => {
                    link.setAttribute('tabindex', '0');
                });
                menuBtn.focus();
                body.addEventListener('keydown', preventFocusOutsideMenu);
            } else {
                menuLinks.forEach(link => {
                    link.setAttribute('tabindex', '-1');
                });
                body.removeEventListener('keydown', preventFocusOutsideMenu);
            }
        });
        const preventFocusOutsideMenu = (event) => {
            if (event.key === 'Tab') {
                const focusableElements = menu.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstFocusableElement = focusableElements[0];
                const lastFocusableElement = focusableElements[focusableElements.length - 1];
                if (!event.shiftKey && document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                } else if (event.shiftKey && document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                event.preventDefault();
            }
        };
    };

    initBurgerMenu();
    initSlider();
});
