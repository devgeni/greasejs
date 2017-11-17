// ==UserScript==
// @name        TPB
// @description Replace text
// @namespace   https://thepiratebay.org
// @include     https://thepiratebay.org/*
// @version     1
// @grant       none
// ==/UserScript==

(() => {
    
var fonts = document.querySelectorAll('font.detDesc');

fonts.forEach(el => {
  var cont = el.textContent.replace(/(\d{2}-\d{2})/, '<b>$1</b>');
  el.innerHTML = cont;
});
    
})();