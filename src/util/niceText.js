const COLOR_A = '#552dad';
const COLOR_B = '#ded1fc';

const niceText = (scene, text, x, y, size) =>
  scene.add
    .text(x, y, text, {
      fontFamily: 'Arial Black',
      fontSize: size,
      color: COLOR_A,
      align: 'center',
    })
    .setStroke(COLOR_B, size / 5)
    .setAlpha(0.85)
    .setOrigin(0.5);

module.exports = niceText;
