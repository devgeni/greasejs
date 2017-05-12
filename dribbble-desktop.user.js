// ==UserScript==
// @name        Make Dribbble Great Again
// @namespace   https://dribbble.com
// @description Load large images for dribbble and delete overlays with(out) JS
// @include     https://dribbble.com/*
// @version     0.3.1
// @author      junib
// @grant       none
// ==/UserScript==

(() => {
    window.onkeydown = scrollPage;
    
    function scrollPage(e) {
        if (e.keyCode === 98) { // numPad 2 / scroll down
            let shot = document.querySelector('[id^="screenshot-"]');
            if (!window.pageYOffset) {
                shot.scrollIntoView();
            } else {
                window.scrollBy(0, shot.clientHeight);
            }
        } else if (e.keyCode === 101) { // numPad 5 / scroll up 
            let shot = document.querySelector('[id^="screenshot-"]');
            window.scrollBy(0, -shot.clientHeight);
        }
    }
    
    var st = document.createElement('style');
    st.innerHTML = '#main ol.dribbbles { max-width: none }' +
        '#main ol.dribbbles li.group { width: 50%; margin: 0 }' +
        'ol.dribbbles li.group div.dribbble-img img { width: 100% }';
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
