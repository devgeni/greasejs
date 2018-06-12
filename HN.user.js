// ==UserScript==
// @name     HackerNews nested comments visual helper
// @version  1
// @include  https://news.ycombinator.com/*
// @grant    none
// ==/UserScript==

(() => {
  const imgs = document.querySelectorAll('img[src="s.gif"][width][height="1"]');

  if (imgs.length) {
    [...imgs].forEach(img => {
      const width = parseInt(img.width, 10);
      
      img.parentNode.style.background = "hsl(" + width + ", 80%, 60%)";
      
      if (width) {
        img.parentNode.appendChild(document.createTextNode(width / 40));
      }
    });
  }
})();