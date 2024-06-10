(() => {
  const tl = gsap.timeline({ delay: .4 });

  tl.from(".main-left__title, .main-left__link", {
    opacity: 0,
    duration: 1.5,
  })
    .from(".main-left__title, .main-left__link", {
      y: 50,
      ease: "power4.out",
      duration: .7,
    }, 0)
    .from(".main-left__text", {
      opacity: 0,
      duration: 1.5
    }, .5)
    .from("#img-1", {
      opacity: 0,
      scale: .9,
      duration: .4
    }, .70)
    .from("#img-2", {
      opacity: 0,
      scale: .9,
      duration: .4
    }, 1.00)
    .from("#img-3", {
      opacity: 0,
      scale: .9,
      duration: .4
    }, 1.3)
    .from(".main-right__text", {
      opacity: 0,
      duration: 1.5
    }, 1.5)

  const burgerOpen = document.getElementById("burger-open");
  const burgerClose = document.getElementById("burger-close");
  let tlBurger = gsap.timeline({ paused: true });

  tlBurger.to(".menu", {
    zIndex: 1,
    duration: 0
  }).from(".menu__up", {
    opacity: 0,
    duration: .6
  }).from(".menu__up", {
    y: -68,
    duration: .3
  }, 0).to(".header", {
    opacity: 0,
    duration: .5
  }, 0).from("#burger-close", {
    opacity: 0,
    duration: .2
  }, .25).to("#burger-open", {
    opacity: 1,
    duration: .2
  }, .2).from(".menu__down", {
    y: 200,
    height: 740,
    duration: .3
  }, .25).from(".menu__down", {
    opacity: 0,
    duration: .9
  }, .25).from(".menu__left", {
    y: -30,
    gap: 90,
    duration: .55
  }, .8).from(".menu__left", {
    opacity: 0,
    duration: .7
  }, .8).from("social-list, .menu__right", {
    y: -30,
    opacity: 0,
    duration: .45
  }, 1.1).to(".site", {
    zIndex: 0,
    duration: 0
  })


  burgerOpen.addEventListener("click", () => {

    tlBurger.play();

  });

  burgerClose.addEventListener("click", () => {

    tlBurger.reverse();

  });

})();
