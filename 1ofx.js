/**
 * Don't edit this file.
 */

const params = new URLSearchParams(window.location.hash.slice(1));

window.OneOfX = {
  realRandom: Math.random.bind(Math),
  tokenId: params.get("tokenId") || (Math.random() * 0xffffffff).toFixed(0),
  save: function () {},
};

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

Math.random = mulberry32(parseInt(OneOfX.tokenId.slice(2), 16));
