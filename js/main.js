import ipads from '../data/ipads.js';

// 헤더 장바구니 드롭다운
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

function showBasket() {
  basketEl.classList.add('show');
}
function hideBasket() {
  basketEl.classList.remove('show');
}

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation();
  if (basketEl.classList.contains('show')) {
    hideBasket()
  } else {
    showBasket()
  }
});

basketEl.addEventListener('click', function (event) {
  event.stopPropagation();
});

window.addEventListener('click', function () {
  hideBasket()
});


// 헤더 검색
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl  = searchWrapEl.querySelector('.search-closer');
const searchShadowEl  = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input');
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')];

searchStarterEl.addEventListener('click', showSearch);
searchCloserEl.addEventListener('click', hideSearch);
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed');
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  });
  setTimeout(function () {
    searchInputEl.focus();
  }, 600);
}

function hideSearch() {
  headerEl.classList.remove('searching');
  document.documentElement.classList.remove('fixed');
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's';
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's';
  });
  searchDelayEls.reverse();
  searchInputEl.value = '';
}


// sprite-icons animation 속성 값 쉽게 생성
let x = 0;
let y = 0;
let frames = '';

for (let i = 0; i < 60; i += 1) {
  frames += `${(100 / 60 * i).toFixed(2)}% { background-position: ${x}${x === 0 ? '' : 'px'} ${y}${y === 0 ? '' : 'px'}; }\n`;
  if (x <= -500) {
    x = 0;
    y -= 100;
    continue;
  }
  x -= 100;
}

// console.log(frames);


// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show');
  });
})
const infoEls = document.querySelectorAll('.info');
infoEls.forEach(function (el) {
  io.observe(el);
})


// 비디오 재생
const video = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click', function () {
  video.play();
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
})
pauseBtn.addEventListener('click', function () {
  video.pause();
  pauseBtn.classList.add('hide');
  playBtn.classList.remove('hide');
})


// '당신에게 맞는 iPad는?' 렌더링
const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  itemEl.innerHTML = /* html */`
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">&#8361;${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  itemsEl.append(itemEl)
})