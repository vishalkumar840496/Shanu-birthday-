const screens = {
  intro: document.getElementById("intro"),
  birthday: document.getElementById("birthday"),
  memories: document.getElementById("memories"),
  letter: document.getElementById("letter"),
  final: document.getElementById("final")
};

const loader = document.getElementById("loader");
const musicHint = document.getElementById("musicHint");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 650);
});


function showScreen(name) {

  Object.values(screens).forEach(screen => {
    screen.classList.remove("active");
  });

  screens[name].classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


document.getElementById("openBtn").addEventListener("click", () => {

  showScreen("birthday");

  musicHint.textContent = "✨ Surprise opened";

  burstHearts();
});


document.getElementById("memoriesBtn").addEventListener("click", () => {

  showScreen("memories");

});


document.getElementById("letterBtn").addEventListener("click", () => {

  showScreen("letter");

});


document.getElementById("wishBtn").addEventListener("click", () => {

  showScreen("final");

  startConfetti();

});


document.getElementById("againBtn").addEventListener("click", () => {

  showScreen("intro");

  stopConfetti();

  musicHint.textContent = "🔊 Tap to begin";

});


document.addEventListener("click", () => {

  musicHint.style.opacity = "0.35";

}, {
  once: true
});


function burstHearts() {

  const hearts = [
    "♥",
    "♡",
    "✦",
    "✧",
    "✨"
  ];

  for (let i = 0; i < 22; i++) {

    const el = document.createElement("div");

    el.textContent =
      hearts[Math.floor(Math.random() * hearts.length)];

    el.style.position = "fixed";

    el.style.left =
      `${Math.random() * 100}vw`;

    el.style.top =
      `${85 + Math.random() * 10}vh`;

    el.style.zIndex = "999";

    el.style.pointerEvents = "none";

    el.style.color =
      i % 2
        ? "#ff91bd"
        : "#a98cff";

    el.style.fontSize =
      `${12 + Math.random() * 18}px`;

    el.style.transition =
      "transform 2.2s ease, opacity 2.2s ease";

    document.body.appendChild(el);


    requestAnimationFrame(() => {

      el.style.transform =
        `translate(${(Math.random() - .5) * 150}px, -${260 + Math.random() * 350}px) rotate(${Math.random() * 180}deg)`;

      el.style.opacity = "0";

    });


    setTimeout(() => {

      el.remove();

    }, 2300);

  }

}


let confettiFrame = null;

let pieces = [];


function startConfetti() {

  const canvas =
    document.getElementById("confetti");

  const ctx =
    canvas.getContext("2d");


  function resize() {

    canvas.width =
      window.innerWidth * devicePixelRatio;

    canvas.height =
      window.innerHeight * devicePixelRatio;

    ctx.setTransform(
      devicePixelRatio,
      0,
      0,
      devicePixelRatio,
      0,
      0
    );

  }


  resize();


  window.addEventListener(
    "resize",
    resize,
    { once: true }
  );


  pieces = Array.from(
    { length: 130 },
    () => ({

      x:
        Math.random() *
        window.innerWidth,

      y:
        -Math.random() *
        window.innerHeight,

      size:
        4 + Math.random() * 8,

      speed:
        2 + Math.random() * 4,

      drift:
        (Math.random() - .5) * 1.5,

      rotation:
        Math.random() * Math.PI,

      spin:
        (Math.random() - .5) * .15,

      type:
        Math.random() > .5
          ? "rect"
          : "circle"

    })
  );


  function frame() {

    ctx.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );


    pieces.forEach(p => {

      p.y += p.speed;

      p.x += p.drift;

      p.rotation += p.spin;


      if (
        p.y >
        window.innerHeight + 20
      ) {

        p.y = -20;

        p.x =
          Math.random() *
          window.innerWidth;

      }


      ctx.save();

      ctx.translate(
        p.x,
        p.y
      );

      ctx.rotate(
        p.rotation
      );


      ctx.fillStyle =
        [
          "#ff4f9a",
          "#ff91bd",
          "#a98cff",
          "#ffffff",
          "#ffd166"
        ][
          Math.floor(
            Math.random() * 5
          )
        ];


      if (p.type === "rect") {

        ctx.fillRect(
          -p.size / 2,
          -p.size / 2,
          p.size,
          p.size * 1.7
        );

      } else {

        ctx.beginPath();

        ctx.arc(
          0,
          0,
          p.size / 2,
          0,
          Math.PI * 2
        );

        ctx.fill();

      }


      ctx.restore();

    });


    confettiFrame =
      requestAnimationFrame(frame);

  }


  cancelAnimationFrame(confettiFrame);

  frame();

}


function stopConfetti() {

  cancelAnimationFrame(confettiFrame);

  const canvas =
    document.getElementById("confetti");

  const ctx =
    canvas.getContext("2d");

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

}
