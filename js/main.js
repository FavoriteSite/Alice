
// Появление меню
let nav = document.querySelector('.icon-menu');

nav.addEventListener('click', function (e) {
  let navList = document.querySelector('.header__content');
  navList.classList.toggle('_active');

  nav.classList.toggle('menu-open');

  let bodyElement = document.body;
  bodyElement.classList.toggle('_hidden');
});


const menuBut = document.querySelectorAll('.menu__link[data-goto]');
if (menuBut.length > 0) {
  for (let i = 0; i < menuBut.length; i++) {
    const but = menuBut[i];
    but.addEventListener('click', menuClick);
  };


  function menuClick(e) {
    const button = e.target;
    if (button.dataset.goto && document.querySelector(button.dataset.goto)) {
      const block = document.querySelector(button.dataset.goto);
      const gotoBlockValue = block.getBoundingClientRect().top + window.pageYOffset;

      let navList = document.querySelector('.header__content');
      navList.classList.remove('_active');

      let bodyElement = document.body;
      bodyElement.classList.remove('_hidden')

      nav.classList.remove('menu-open');

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}

//swiper reviews

new Swiper('.swiper-reviews', {

  //НАВИГАЦИЯ
  // 1  булеты, текущее положение
  pagination: {
    el: '.reviews-pagination',


    //* булеты
    type: 'bullets',
    //*переключать нажатием на булеты
    clickable: true,
  },
  speed: 1000,
  navigation: {
    nextEl: '.reviews-next',
    prevEl: '.reviews-prew'
  },

  // *чувствительность к перетаскиванию от 0 до 1 / 0  - запретить
  touchRatio: 1,


  //* Автовысота / булеты  будут подниматься, если высота картинки становится выше
  autoHeight: false,


  //* количество слайдов для показа  1 - ЗПУ
  //* можно выводить не ровное кол-во слайдов 1.4
  //* количество слайдов для показа автоматически - slidesPerView: auto,  для этого в css нужно указать  /** автоширина */
  slidesPerView: 1,

  //* количество пролистываемых слайдов
  slidesPerGroup: 1,

  //* бесконечный слайдер
  loop: true,
});


//popup


const popupLinks = document.querySelectorAll('.popup-link');
//  тег body для блокировки скролла при открытом попапе
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('data-record').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
    });
  }
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let i = 0; i < popupCloseIcon.length; i++) {
    const el = popupCloseIcon[i];
    el.addEventListener("click", function (e) {
      popupClose(el.closest('.popup'));
    });
  }
}

// получаем открытый попап и если он существует, его закрываем и у боди блокируем скролл
// далее попап, который передали (curentPopup) открываем и вешаем собитие при клике, чтобы закрылся попап только на темную область
//   if (!e.target.closest('.popup__content')) - если при клике на что-то у родителя нет такого класса т.е. это оболочка
// при клике на которую он заркывается 
// если я нажму на объект у которого есть родитель с клаасом .popup__content, то он не закроется, потому что стоит !знак НЕ
//  то есть закроется при нажатие на блоки с классами .popup__body и  .popup
function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

// высчитывание ширины скролла, чтобы его скрывать при открытии попапа
function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

//  закрытие по esc
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});