/**
 * Don't edit this file.
 */

const params = new URLSearchParams(window.location.hash.slice(1));
const realRandom = Math.random.bind(Math);
const tokenId = params.get("tokenId") || (realRandom() * 0xffffffff).toFixed(0);

Math.random = (function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
})(parseInt(tokenId.slice(2), 16));

window.OneOfX = {
  realRandom,
  tokenId,
  tokenIndex: params.get("tokenIndex") || (Math.random() * 100).toFixed(0),
  save: function (props) {
    console.log("Properties:", props);
    this.save = () => {};
  },
};
