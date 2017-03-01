// ==UserScript==
// @name        Make Dribbble Great Again on my tablet
// @namespace   https://dribbble.com
// @description Load better images for dribbble
// @include     https://dribbble.com/*
// @version     0.1
// @author      junib
// @grant       none
// ==/UserScript==

(() => {

    var imgs = document.querySelectorAll('.dribbble-shot .dribbble-img .dribbble-link picture');

    if (imgs.length) {
        imgs.forEach(el => {
            let img = document.createElement('img');
            img.src = el.firstElementChild.srcset;

            let par = el.parentNode;
            par.insertBefore(img, el);

            par.removeChild(el);
        });
    }

    var st = document.createElement('style');

    st.innerHTML = 'ol.dribbbles li.group { width: 340px; }' +
        'ol.dribbbles li.group div.dribbble-img img { width: 100% }' +
        '.dribbble-over { display: none }';
    document.head.appendChild(st);

})();
