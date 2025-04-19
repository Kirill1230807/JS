class Slider {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.slides = options.slides || [];
        this.currentIndex = 0;
        this.transitionDuration = options.transitionDuration || 500;
        this.autoplay = options.autoplay || false;
        this.autoplayInterval = options.autoplayInterval || 3000;
        this.showArrows = options.showArrows !== false;
        this.showDots = options.showDots !== false;
        this.autoplayTimeout = null;
        this.isHovered = false;

        this.init();
    }

    init() {
        this.slider = this.container.querySelector('.slider');
        this.arrowLeft = this.container.querySelector('.slider-arrow-left');
        this.arrowRight = this.container.querySelector('.slider-arrow-right');
        this.dotsContainer = this.container.querySelector('.slider-dots');

        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'slide';
            slideElement.style.backgroundImage = `url(${slide.image})`;
            slideElement.textContent = slide.text || '';
            slideElement.setAttribute('data-index', index);
            this.slider.appendChild(slideElement);
        });

        if (this.showArrows) {
            this.arrowLeft.style.display = 'flex';
            this.arrowRight.style.display = 'flex';
        } else {
            this.arrowLeft.style.display = 'none';
            this.arrowRight.style.display = 'none';
        }

        if (this.showDots) {
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'slider-dot';
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('data-index', index);
                this.dotsContainer.appendChild(dot);
            });
        } else {
            this.dotsContainer.style.display = 'none';
        }

        this.arrowLeft.addEventListener('click', () => this.prevSlide());
        this.arrowRight.addEventListener('click', () => this.nextSlide());

        if (this.showDots) {
            document.querySelectorAll('.slider-dot').forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    this.goToSlide(index);
                });
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        this.container.addEventListener('mouseenter', () => {
            this.isHovered = true;
            if (this.autoplay) {
                clearTimeout(this.autoplayTimeout);
            }
        });

        this.container.addEventListener('mouseleave', () => {
            this.isHovered = false;
            if (this.autoplay) {
                this.startAutoplay();
            }
        });

        // Автопрокрутка
        if (this.autoplay) {
            this.startAutoplay();
        }

        // Адаптивність
        window.addEventListener('resize', () => {
            this.updateSliderPosition();
        });
    }

    updateSliderPosition() {
        this.slider.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.slider.style.transition = `transform ${this.transitionDuration}ms ease`;
        this.updateSliderPosition();
        this.updateDots();
    }

    nextSlide() {
        if (this.currentIndex >= this.slides.length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.slider.style.transition = `transform ${this.transitionDuration}ms ease`;
        this.updateSliderPosition();
        this.updateDots();

        if (this.autoplay && !this.isHovered) {
            clearTimeout(this.autoplayTimeout);
            this.startAutoplay();
        }
    }

    prevSlide() {
        if (this.currentIndex <= 0) {
            this.currentIndex = this.slides.length - 1;
        } else {
            this.currentIndex--;
        }
        this.slider.style.transition = `transform ${this.transitionDuration}ms ease`;
        this.updateSliderPosition();
        this.updateDots();

        if (this.autoplay && !this.isHovered) {
            clearTimeout(this.autoplayTimeout);
            this.startAutoplay();
        }
    }

    updateDots() {
        if (this.showDots) {
            document.querySelectorAll('.slider-dot').forEach(dot => {
                dot.classList.remove('active');
            });
            document.querySelector(`.slider-dot[data-index="${this.currentIndex}"]`).classList.add('active');
        }
    }

    startAutoplay() {
        if (this.autoplay && !this.isHovered) {
            this.autoplayTimeout = setTimeout(() => {
                this.nextSlide();
            }, 3000);
        }
    }
}

const slider1 = new Slider('slider1', {
    slides: [
        { image: 'https://picsum.photos/800/400?random=1', text: 'Слайд 1' },
        { image: 'https://picsum.photos/800/400?random=2', text: 'Слайд 2' },
        { image: 'https://picsum.photos/800/400?random=3', text: 'Слайд 3' },
        { image: 'https://picsum.photos/800/400?random=4', text: 'Слайд 4' },
        { image: 'https://picsum.photos/800/400?random=5', text: 'Слайд 5' }
    ],
    transitionDuration: 500,
    autoplay: true,
    showArrows: true,
    showDots: true
});