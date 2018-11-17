// ==UserScript==
// @name        Make Dribbble Great Again
// @namespace   https://dribbble.com
// @description Load large images for dribbble and delete overlays with(out) JS
// @include     https://dribbble.com/*
// @version     0.7.0
// @author      devgeni
// @grant       none
// ==/UserScript==

const create = (tag, props) => {
  const el = document.createElement(tag);
  
  for (const prop in props) {
    el[prop] = props[prop];
  }
  
  return el;
};


const init = () => {
  console.log('new thing');
  
  const style = create('style');
  style.innerHTML = '#main ol.dribbbles { max-width: none }' +
        '#main ol.dribbbles li.group { width: 50%; margin: 0 }' +
        'ol.dribbbles li.group div.dribbble-img img { width: 100%; max-width: 1320px; }' +
        '#header-inner + .group { position: fixed; bottom: 0; background: white }' +
        '#header-inner + .group > #nav li ul.tabs { bottom: 100% }' +
        '#main .dribbble-shot { padding: 15px; }' +
      	'#main ol.dribbbles li.group div.dribbble a.dribbble-over { display: none; }';
  
  document.head.appendChild(style);
  
  
  const changeImg = (el) => {   
        const pic = el.querySelector('.dribbble-link picture');
        const picsrc = pic.firstElementChild.srcset.replace(/_1x(\..+)$/, "$1");

    		const img = create('img', { src: picsrc });

        const par = pic.parentNode;
        par.insertBefore(img, pic);

        // removing
        par.removeChild(pic);
        // removing overlay. why???
        par.parentNode.removeChild(par.nextElementSibling);
  };

    // first call
  const litems = document.querySelectorAll('.dribbbles > .group');
  litems.forEach((litem) => changeImg(litem) );

    // waiting for new dribbbles to come
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach((litem) => changeImg(litem) );
    });
  });
  observer.observe(document.querySelector('.dribbbles'), { childList: true });
  
  
  const getVisibleShots = (selector = '[id^="screenshot-"]') => {
        const shots = document.querySelectorAll(selector);
        return [...shots].filter(shot => {
            const rect = shot.getBoundingClientRect();
            return (rect.top >= 0) && (rect.bottom <= window.innerHeight);
        });
  };

  const scrollPageOpenLink = (e) => {
    if (!e.ctrlKey) {
      if ([83, 98].includes(e.keyCode)) { // numPad 2 or s / scroll down
        const shot = document.querySelector('[id^="screenshot-"]');
        if (!window.pageYOffset) {
          shot.scrollIntoView();
        } else {
          window.scrollBy(0, shot.clientHeight);
        }
      } else if ([87, 101].includes(e.keyCode)) { // numPad 5 or w / scroll up 
        const shot = document.querySelector('[id^="screenshot-"]');
        window.scrollBy(0, -shot.clientHeight);
      } else if ([49, 50].includes(e.keyCode)) {
        const shots = getVisibleShots();
        const link = shots[e.keyCode % 49].querySelector('a.dribbble-link[href]').href;
        window.open(link, '_blank');
      }
    }
  };

  window.addEventListener('keyup', scrollPageOpenLink);
  
  
  
  const list = [
    { name: 'RECENT', link: '/shots?sort=recent&list=attachments' },
    { name: 'Landing', link: '/tags/landing' },
    { name: 'Landing Page', link: '/tags/landing_page' },
    { name: 'Website', link: '/tags/website' },
    { name: 'Website Design', link: '/tags/website_design' },
    { name: 'Webdesign', link: '/tags/webdesign' }
  ];

  const sublist = [
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
  ];

  const subul = create('ul', { className: 'tabs' });
  
  sublist.forEach(li => {
  	const litem = create('li');
    const an = create('a', { href: li.link, textContent: li.name });
    
    litem.appendChild(an);
    subul.appendChild(litem);
  });
  
  const nav = create('ul', { id: 'nav' });
  const navgroup = create('div', { className: 'group' });
	
  navgroup.appendChild(nav);
  document.querySelector('#header').appendChild(navgroup);
  
  list.forEach(li => {
    const litem = create('li');
    const an = create('a', { href: li.link, textContent: li.name });
		
    litem.appendChild(an);
    nav.appendChild(litem);
  });

  const li_more = create('li');
  li_more.innerHTML = '<a href="#" class="has-sub">More</a>' + subul.outerHTML;
  
  nav.appendChild(li_more);
};

window.addEventListener('load', init);
