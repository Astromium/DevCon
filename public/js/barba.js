/* eslint-disable */

function delay(n) {
  n = n || 2000;
  return new Promise(done => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function pageTransition() {
  let tl = gsap.timeline();
  //tl.set('.loading-screen', { transformOrigin: 'bottom left' });
  //   tl.to('.loading-screen', { duration: 0.5, scaleY: 1 });
  //   tl.to('loading-screen', {
  //     duration: 0.5,
  //     scaleY: 0,
  //     skewX: 0,
  //     transformOrigin: 'top left',
  //     ease: 'power1.out',
  //     delay: 1
  //   });
  tl.to('.loading-screen', { duration: 0.5, scaleY: 1 });
  tl.to('.loading-screen', {
    duration: 0.5,
    scaleY: 0,
    skewX: 0,
    transformOrigin: 'top left',
    ease: 'power1.out',
    delay: 1
  });
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();

        pageTransition();
        await delay(500);
        done();
      },
      async enter(data) {
        contentAnimation();
      },
      async once(data) {
        contentAnimation();
      }
    }
  ]
});
