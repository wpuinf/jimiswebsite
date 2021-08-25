//konamiListener Quelle: https://stackoverflow.com/a/45576888
function onKonamiCode(cb) {
    var input = '';
    var key = '38384040373937396665';
    document.addEventListener('keydown', function (e) {
    input += ("" + e.keyCode);
    if (input === key) {
      return cb();
    }
    if (!key.indexOf(input)) return;
    input = ("" + e.keyCode);
    });
    }
    onKonamiCode(function () {window.open("./assets/nevergonna.mp4")})