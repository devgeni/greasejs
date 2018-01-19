// ==UserScript==
// @name        Make Dribbble Great Again
// @namespace   https://dribbble.com
// @description Load large images for dribbble and delete overlays with(out) JS
// @include     https://dribbble.com/*
// @version     0.4.1
// @author      junib
// @grant       none
// ==/UserScript==

(() => {
    
    if (jQuery) {
        var list = [
            { name: 'RECENT', link: '/shots?sort=recent&list=attachments' },
            { name: 'Landing', link: '/tags/landing' },
            { name: 'Landing Page', link: '/tags/landing_page' },
            { name: 'Website', link: '/tags/website' },
            { name: 'Website Design', link: '/tags/website_design' },
            { name: 'Webdesign', link: '/tags/webdesign' }
        ];
        
        var sublist = [
            { name: 'Fashion', link: '/tags/fashion' },
            { name: 'Furniture', link: '/tags/furniture' },
            { name: 'Ecommerce', link: '/tags/ecommerce' },
            { name: 'Jewelry', link: '/tags/jewelry' },
            { name: 'Jewellery', link: '/tags/jewellery' },
            { name: 'Artist', link: '/tags/artist' },
            { name: 'Agency', link: '/tags/agency' },
            { name: 'Designer', link: '/tags/designer' },
            { name: 'Lawyer', link: '/tags/lawyer' },
            { name: 'Portfolio', link: '/tags/portfolio' }
        ]
        
        var $ = jQuery;
        var subul = $('<ul class="tabs"></ul>');
        sublist.forEach(li => {
            subul.append(`<li><a href="${li.link}">${li.name}</a></li>`);
        });
        
        var ul = $('#header').append('<div class="group"><ul id="nav"></ul></div>').children().last().find('#nav');
        list.forEach(el => {
            ul.append(`<li><a href="${el.link}">${el.name}</a></li>`);
        });
        
        ul.append(`<li><a href="#" class="has-sub">More</a>${subul[0].outerHTML}</li>`);
    }
    
    window.onkeydown = scrollPage;
    
    function scrollPage(e) {
        if ([83, 98].includes(e.keyCode)) { // numPad 2 or s / scroll down
            let shot = document.querySelector('[id^="screenshot-"]');
            if (!window.pageYOffset) {
                shot.scrollIntoView();
            } else {
                window.scrollBy(0, shot.clientHeight);
            }
        } else if ([87, 101].includes(e.keyCode)) { // numPad 5 or w / scroll up 
            let shot = document.querySelector('[id^="screenshot-"]');
            window.scrollBy(0, -shot.clientHeight);
        }
    }
    
    var st = document.createElement('style');
    st.innerHTML = '#main ol.dribbbles { max-width: none }' +
        '#main ol.dribbbles li.group { width: 50%; margin: 0 }' +
        'ol.dribbbles li.group div.dribbble-img img { width: 100%; max-width: 1320px; }' +
        '#main .dribbble-shot { padding: 15px; }';
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
