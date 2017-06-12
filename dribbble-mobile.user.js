// ==UserScript==
// @name Dribbble Max & Better Img mobile
// @namespace https://dribbble.com
// @description (Enjoy) dribbble with(out) js
// @include https://dribbble.com/*
// @version 0.3.0
// @author junib
// ==/UserScript==

(() => {
    
    var st = document.createElement('style');
    st.innerHTML = '#main ol.dribbbles { max-width: none }' +
        '#main ol.dribbbles li.group { width: 100%; margin: 0 }' +
        'ol.dribbbles li.group div.dribbble-img img { width: 100% }' +
        '#wrap-inner { padding: 0 }';
    document.head.appendChild(st);

    let changeImg = (el) => {   
            let pic = el.querySelector('.dribbble-link picture');
            let picsrc = pic.firstElementChild.srcset.replace(/_1x(\..+)$/, "$1");
            let img = document.createElement('img');
            img.src = picsrc;

            let par = pic.parentNode;
            par.insertBefore(img, pic);

            // removing
            par.removeChild(pic);
            // removing overlay. why???
            par.parentNode.removeChild(par.nextElementSibling);
    };

    // first call
    let litems = document.querySelectorAll('.dribbbles > .group');
    litems.forEach((litem) => changeImg(litem) );

    // waiting for new dribbbles to come
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach((litem) => changeImg(litem) );
        });
    });
    observer.observe(document.querySelector('.dribbbles'), { childList: true });

})();
