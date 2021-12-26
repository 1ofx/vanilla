// Natural width and height before scaling
const width = 200;
const height = 200;

// Should your art scale to contain or cover the viewport?
// see contain & cover: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
const shouldContain = false;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const dpi = window.devicePixelRatio || 1;

// requestAnimationFrame uses the display frequency which isn't always 60hz
// always a good idea to throttle it down to your expected fps.
const fps = 60;

const scale = (
  shouldContain
    ? window.innerWidth >= window.innerHeight
    : window.innerWidth <= window.innerHeight
)
  ? window.innerHeight / height
  : window.innerWidth / width;

const realWidth = width * scale;
const realHeight = height * scale;

canvas.width = realWidth * dpi;
canvas.height = realHeight * dpi;
canvas.style.width = realWidth + "px";
canvas.style.height = realHeight + "px";

const hue = Math.round(Math.random() * 18) * 20;
const backgroundColor = `hsl(${hue}, 30%, 50%)`;
const strokeStyle = `hsl(${hue + 20}, 50%, 60%)`;

// 1ofx will use your background color to generate a theme
// for your token.
document.body.style.backgroundColor = backgroundColor;

let frame = 0;
let lastFrame = performance.now();
(function loop() {
  window.requestAnimationFrame(loop);
  if (performance.now() - lastFrame < 1000 / fps) return;
  lastFrame = performance.now();

  frame++;
  canvas.width = canvas.width;

  ctx.strokeStyle = strokeStyle;
  ctx.scale(scale * dpi, scale * dpi);

  for (let i = 40; i < width; i += 10) {
    ctx.lineWidth = Math.max(
      1,
      4 * (Math.cos(((i + -frame / 3) / width) * Math.PI * 2) + 1)
    );
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, i, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Once you have drawn you can
  // save any features. This will
  // also trigger your snapshot.
  window.OneOfX.save({
    Hue: hue,
    "Fill Style": backgroundColor,
    "Stroke Style": strokeStyle,
  });
})();
