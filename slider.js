document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('#carouselExample');
    const carouselInner = carousel.querySelector('.carousel-inner .row');
    const items = carouselInner.querySelectorAll('.col-12');
    const nextButton = carousel.querySelector('.carousel-control-next');
    const prevButton = carousel.querySelector('.carousel-control-prev');
    let currentIndex = 0;

    const getVisibleItems = () => {
        if (window.innerWidth >= 1200) {
            return 4;
        } else if (window.innerWidth >= 768) {
            return 3;
        } else {
            return 1;
        }
    };

    const updateCarousel = (direction) => {
        const visibleItems = getVisibleItems();
        const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight, 10);
        const maxIndex = items.length - visibleItems;

        if (direction === 'next') {
            currentIndex = (currentIndex + 1 > maxIndex) ? 0 : currentIndex + 1;
        } else {
            currentIndex = (currentIndex - 1 < 0) ? maxIndex : currentIndex - 1;
        }

        const newTransform = -itemWidth * currentIndex;
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        carouselInner.style.transform = `translateX(${newTransform}px)`;
    };

    nextButton.addEventListener('click', () => {
        updateCarousel('next');
    });

    prevButton.addEventListener('click', () => {
        updateCarousel('prev');
    });

    window.addEventListener('resize', () => {
        currentIndex = 0;
        carouselInner.style.transition = 'none';
        carouselInner.style.transform = 'translateX(0px)';
    });
});
