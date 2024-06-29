document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('#carouselExample');
    const carouselInner = carousel.querySelector('.carousel-inner .row');
    const items = carouselInner.querySelectorAll('.col-md-4');
    const nextButton = carousel.querySelector('.carousel-control-next');
    const prevButton = carousel.querySelector('.carousel-control-prev');
    let currentIndex = 0;

    const updateCarousel = (direction) => {
        const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight, 10);
        const maxIndex = items.length - Math.floor(carouselInner.offsetWidth / itemWidth);

        if (direction === 'next') {
            currentIndex = (currentIndex + 1 > maxIndex) ? 0 : currentIndex + 1;
        } else {
            currentIndex = (currentIndex - 1 < 0) ? maxIndex : currentIndex - 1;
        }

        const newTransform = -itemWidth * currentIndex;
        carouselInner.style.transform = `translateX(${newTransform}px)`;
    };

    nextButton.addEventListener('click', () => {
        updateCarousel('next');
    });

    prevButton.addEventListener('click', () => {
        updateCarousel('prev');
    });
});
