// ==UserScript==
// @name Dribbble Max Img mobile
// @namespace https://dribbble.com
// @description (Enjoy) dribbble without js
// @include https://dribbble.com/*
// @version 0.2
// @author junib
// ==/UserScript==

(() => {
    
    var imgs = document.querySelectorAll('.dribbble-shot .dribbble-img .dribbble-link picture img');

    if (imgs.length) {
        imgs.forEach(el => el.src.replace(/_teaser(\..+)$/, "_1x$1"));
    }
    
    let st = document.createElement('style');
    st.innerHTML = 'body.grid-small ol.dribbbles li.group[id^="screenshot"], ol.dribbbles li.group div.dribbble-img img { width: 100% }';
    document.head.appendChild(st);
})();
