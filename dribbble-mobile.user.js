// ==UserScript==
// @name Dribbble Max & Better Img mobile
// @namespace https://dribbble.com
// @description (Enjoy) dribbble without js
// @include https://dribbble.com/*
// @version 0.2.2
// @author junib
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
    
    let st = document.createElement('style');
    st.innerHTML = 'body.grid-small ol.dribbbles li.group[id^="screenshot"], ol.dribbbles li.group div.dribbble-img img { width: 100% }';
    document.head.appendChild(st);
})();
