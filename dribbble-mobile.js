// ==UserScript==
// @name Dribbble Max Img mobile
// @namespace https://dribbble.com
// @description (Enjoy) dribbble without js
// @include https://dribbble.com/*
// @version 0.1
// @author junib
// ==/UserScript==

(() => {
    let st = document.createElement('style');
    st.innerHTML = 'body.grid-small ol.dribbbles li.group[id^="screenshot"], ol.dribbbles li.group div.dribbble-img img { width: 100% }';
    document.head.appendChild(st);
})();
