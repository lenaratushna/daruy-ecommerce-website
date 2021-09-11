'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header__wrapper'),
        menuItems = document.querySelectorAll('.menu__item'),
        searchBtn = document.querySelector('.search-form__icon'),
        searchForm = document.querySelector('.search-form'),
        burger = document.querySelector('.icon-menu'),
        menuBody = document.querySelector('.menu .menu__body');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('_hover');
        });
    });

    searchBtn.addEventListener('click', () => {
        searchForm.classList.toggle('_active');
    });

    burger.addEventListener('click', () => {
        burger.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });

    document.addEventListener('click', documentActions);

    function documentActions(e) {
        const targetEl = e.target,
            menuItemsHover = document.querySelectorAll('.menu__item._hover');

        if (!targetEl.closest('.menu__item') && menuItemsHover.length > 0) {
            menuItemsHover.forEach(item => {
                item.classList.remove('_hover');
            });
        }
    }

    (function () {
        window.onscroll = () => {
            if (window.pageYOffset > 30) {
                header.style.background = '#fff';
            } else {
                header.style.background = '';
            }
        };
    }());

    //Slider
    const slides = document.querySelectorAll('.slider-main__slide'),
        slider = document.querySelector('.slider-main__controls'),
        prev = document.querySelector('.slider-arrow_prev'),
        next = document.querySelector('.slider-arrow_next'),
        slidesWrapper = document.querySelector('.slider-main__body'),
        slidesField = document.querySelector('.slider-main__wrapper'),
        width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    //slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');



    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.prepend(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
});

