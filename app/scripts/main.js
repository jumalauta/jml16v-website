(function () {
  console.log('Jumalauta Sweet Sixteen');
  var kb = '';
  var palette = [];
  var canvas, context, indices, data;

  var genBm = function (w, h, t) {
    if (isNaN(t)) {
      t = 0;
    }
    var arr = [];
    var xc = w / 2;
    var yc = h / 2;
    var pLen = palette.length;
    for (var i = 0; i < h; i++) {
      for (var j = 0; j < w; j++) {
        arr.push(Math.round(pLen / 4 + (pLen / 4 - 1) * Math.sin(hypot(xc - j, yc - i) / 16 + t) + (pLen / 4 + (pLen / 4 - 1) * Math.sin(i / (37 + 15 * Math.cos(j / 74 + t)) + t) * Math.cos(j / (31 + 11 * Math.sin(i / 57 + t)) + t))));
      }
    }
    return arr;
  };

  var hypot = function (x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  };

  var rotatePal = function () {
    palette.push(palette.shift());
  };

  var draw = function () {
    var di = 0;
    var c;
    var len = canvas.width * canvas.height;
    for (var i = 0; i < len; i++) {
      c = palette[indices[i]];
      data.data[di++] = c.r;
      data.data[di++] = c.g / 4;
      data.data[di++] = c.b / 2;
      data.data[di++] = 255;
    }

    context.putImageData(data, 0, 0, 0, 0, canvas.width, canvas.height);
  };

  var init = function () {
    canvas = document.createElement('canvas');
    document.querySelector('body').appendChild(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.right = '0';
    canvas.style.bottom = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = 1;
    for (var i = 0; i < 256; i++) {
      var val = Math.abs(256 - (i * 2));
      palette.push({ r: val, g: val, b: val });
    }
    context = canvas.getContext('2d');
    indices = genBm(canvas.width, canvas.height);
    data = context.createImageData(canvas.width, canvas.height);

    setInterval(function () {
      var d = new Date();
      rotatePal();
      indices = genBm(canvas.width, canvas.height, d.getTime() / 1000);
      draw();
    }, 1000 / 60);
  };

  document.addEventListener('keyup', function (event) {
    kb += event.keyCode.toString();
    if (kb === '38384040373937396665') {
      init();
    }
  }, false);
})();
