// ==UserScript==
// @name        lazy images
// @namespace   https?://*/*
// @description load lazy images
// @include     
// @version     1
// @grant       none
// ==/UserScript==



(() => {

  let lazyLoad = (attrib) => {
    let imgs = document.querySelectorAll('img['+attrib+']');
       if (imgs.length) {
          imgs.forEach((img) => {
             img.setAttribute('src', img.getAttribute(attrib));
          });
       }
  };
  
  lazyLoad('data-src');
  lazyLoad('data-original');
  lazyLoad('data-original-mos');
  lazyLoad('data-pagespeed-lazy-src');
  lazyLoad('data-postload-img');
  lazyLoad('data-layzr');
  
  
})();