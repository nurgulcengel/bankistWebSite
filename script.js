'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const contents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

//MODAL
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//SMOOTH SCROLL TO

btnScrollTo.addEventListener('click', function () {

  section1.scrollIntoView({ behavior: "smooth" });

});

//SMOOTH SCROLL TO ALL LINKS

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }

});

//TAB AND COMPONENT

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')

  if (!clicked) return;
  //tab area
  tabs.forEach(btn => btn.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //content area
  contents.forEach(cnt => cnt.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

//MENU FADE ANIMATION


const handleOver = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = nav.querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(l => l !== link ? l.parentElement.style.opacity = this : '');
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleOver.bind(0.5));
nav.addEventListener('mouseout', handleOver.bind(1));

//STICKY NAVIGATION - INTERSECTION OBSERVER API

const navHeight=nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin:`-${navHeight}px`,
})
observer.observe(header);


//Revealing Elements on Scroll
const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.20
})

allSection.forEach(function (sec) {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

//Lazy IMG 

const lazyImg = document.querySelectorAll('img[data-src]');

const loadRealImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry)
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);

};

const imgObserver = new IntersectionObserver(loadRealImg, {
  root: null,
  threshold: 0,
  rootMargin: '-300px'

})

lazyImg.forEach(img => imgObserver.observe(img));

//SLIDER 
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnSlideLeft = document.querySelector('.slider__btn--left');
const btnSlideRight = document.querySelector('.slider__btn--right');
const dotContainer=document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length - 1;

//functions
const createDots=function(){
slides.forEach(function(_,i){
  dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`  )
})
};

const activateDot=function(slide){
document.querySelectorAll('.dots__dot').forEach(dotBtn=>dotBtn.classList.remove('dots__dot--active'));

document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
}

const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}
//eventlistenerlar
btnSlideRight.addEventListener('click', nextSlide);
btnSlideLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown',function(e){
e.key==='ArrowLeft' && prevSlide();
e.key==='ArrowRight' && nextSlide();
})
dotContainer.addEventListener('click',function(e){
 if(e.target.classList.contains('dots__dot')){
  const {slide}=e.target.dataset;
  goToSlide(slide);
  activateDot(slide);
  }
});
//baslangıc durumları
goToSlide(0);
createDots();
activateDot(0);

