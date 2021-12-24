// Natural width and height before scaling
const width = 200;
const height = 200;

// Should your art scale to contain or cover the viewport?
// see contain & cover: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
const shouldContain = true;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const dpi = window.devicePixelRatio || 1;

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

function loop() {
  canvas.width = canvas.width;

  ctx.save();
  ctx.scale(scale * dpi, scale * dpi);

  for (let i = 40; i < width; i += 10) {
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, i, 0, 2 * Math.PI);
    ctx.stroke();
  }

  ctx.restore();

  // Once you have drawn you can
  // save any features. This will
  // also trigger your snapshot.
  window.OneOfX.save({
    "Feature Name": 1,
  });

  window.requestAnimationFrame(loop);
}

loop();
