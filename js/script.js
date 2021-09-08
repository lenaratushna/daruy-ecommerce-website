'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu__item'),
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
});