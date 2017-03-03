// ==UserScript==
// @name        Make Dribbble Great Again
// @namespace   https://dribbble.com
// @description Load large images for dribbble and delete overlays
// @include     https://dribbble.com/*
// @version     0.1.1
// @author      junib
// @grant       none
// ==/UserScript==

(() => {

    var imgs = document.querySelectorAll('.dribbble-shot .dribbble-img .dribbble-link picture');

    if (imgs.length) {
        imgs.forEach(el => {
            // remove _1x from first img source using regexp
            let picsrc = el.firstElementChild.srcset.replace(/_1x(\..+)$/, "$1");
            let img = document.createElement('img');
            img.src = picsrc;

            let par = el.parentNode;
            par.insertBefore(img, el);

            // remove self
            par.removeChild(el);
            // remove overlay
            par.parentNode.removeChild(par.nextElementSibling);
        });
    }

    var st = document.createElement('style');

    st.innerHTML = 'ol.dribbbles li.group { width: 47%; }' +
        'ol.dribbbles li.group div.dribbble-img img { width: 100% }';
    document.head.appendChild(st);

})();
