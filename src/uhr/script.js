function init() {
    if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'en');
    }
    changeLanguage(localStorage.getItem('language'));
    currentTime();
}

function currentTime() {
    const dt = new Date();
    let hours = dt.getHours().toString();
    let minutes = dt.getMinutes().toString();
    let seconds = dt.getSeconds().toString();

    if (hours.length === 1) {
        hours = '0' + hours;
    };
    if (minutes.length === 1) {
        minutes = '0' + minutes;
    };
    if (seconds.length === 1) {
        seconds = '0' + seconds;
    };

    const time = `${hours}:${minutes}:${seconds}`;
    let timeDiv = document.getElementById('time');

    const weekDay = dt.getDay();
    const month = dt.getMonth();
    const day = dt.getDate();
    const year = dt.getFullYear();

    const names = JSON.parse(localStorage.getItem('names'));

    let date = `${names.weekDays[weekDay]}, ${day} ${names.months[month]} ${year}`;
    let dateDiv = document.getElementById('date');

    dateDiv.innerText = date;
    timeDiv.innerText = time;

    let t = setTimeout(function(){currentTime()}, 1000);
}

function changeLanguage(language) {
    let opposite;
    if (language === 'de') {
        opposite = 'en';
        localStorage.setItem('names', JSON.stringify({weekDays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'], months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']}))
    } else if (language === 'en') {
        opposite = 'de';
        localStorage.setItem('names', JSON.stringify({weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}));
    }
    localStorage.setItem('language', language);
    document.getElementsByName(language)[0].className = 'selected';
    document.getElementsByName(opposite)[0].className = '';
}

function openFullscreen() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }

    document.getElementById('fullscreen').innerHTML = '<a onclick="closeFullscreen()"><img src="./fullscreen/true.svg"></a>';
}

function closeFullscreen() {
    let elem = document.documentElement;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }

    document.getElementById('fullscreen').innerHTML = '<a onclick="openFullscreen()"><img src="./fullscreen/false.svg"></a>';
  }