function init() {
    let name = localStorage.getItem('name');
    if (name) {
        document.getElementById('login').style.display = "none";
    }
    fetch('https://horstcors.herokuapp.com/https://alex-riedel.de/randV2.php?anz=1', {
        method: 'GET'
    }).then(async request => {
        const response = await request.json();
        const word = toUtf8(response[0]).toLowerCase();
        localStorage.setItem('word', word);
        localStorage.setItem('wrongGuesses', JSON.stringify([]));
        if (!localStorage.getItem('stats')) {
            localStorage.setItem('stats', JSON.stringify({
                games: 0,
                wins: 0,
                losses: 0,
                streak: 0
            }));
        }
        updateStats();
        let uscores = "";
        for (let i = 0; i < word.length; i++) {
            uscores += "_";
        }
        document.getElementById('word').innerHTML = uscores;
    });
}

function guess(guess) {
    let wrongGuesses = JSON.parse(localStorage.getItem('wrongGuesses'));
    let word = localStorage.getItem('word');
    let uscores = document.getElementById('word').innerHTML;
    if (guess.length != 1) {
        clearGuess();
        document.getElementById('errors').innerHTML = "Bitte EINEN Buchstabe eingeben!";
        return;
    }
    if ("abcdefghijklmnopqrstuvwxyzäöüß".indexOf(guess) == -1) {
        clearGuess();
        document.getElementById('errors').innerHTML = "Bitte Buchstabe eingeben!";
        return;
    }
    if (wrongGuesses.includes(guess) || uscores.includes(guess)) {
        clearGuess();
        document.getElementById('errors').innerHTML = "Du hast diesen Buchstaben bereits geraten!";
        return;
    }

    if (word.toLowerCase().includes(guess)) {
        for (let i = 0; i < word.length; i++) {
            if (word.toLowerCase().charAt(i) == guess) {
                uscores = uscores.substr(0, i) + guess + uscores.substr(i + 1);
            }
        }
        document.getElementById('word').innerHTML = uscores;
        clearGuess();
        clearErrors();

        if (uscores == word) {
            document.getElementById('errors').innerHTML = 'Glückwunsch! Du hast das Wort erraten!<br><button onclick="location.reload()">Neues Spiel</button>';
            let stats = JSON.parse(localStorage.getItem('stats'));
            stats.streak++;
            stats.games++;
            stats.wins++;
            localStorage.setItem('stats', JSON.stringify(stats));
            updateStats();
            registerGame();
        }
    } else {
        document.getElementById('errors').innerHTML = "Buchstabe nicht vorhanden!";
        wrongGuesses.push(guess);
        localStorage.setItem('wrongGuesses', JSON.stringify(wrongGuesses));
        document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(", ");
        if (wrongGuesses.length >= 6) {
            document.getElementById('word').innerHTML = word;
            document.getElementById('errors').innerHTML = 'Du hast leider verloren! Versuche es nochmal!<br><button onclick="location.reload()">Neues Spiel</button>';
            let stats = JSON.parse(localStorage.getItem('stats'));
            stats.streak = 0;
            stats.games++;
            stats.losses++;
            localStorage.setItem('stats', JSON.stringify(stats));
            updateStats();
            registerGame();
        };
        clearGuess();
    }

    document.getElementById('currentHangman').innerHTML = `<img src="./hangmen/${wrongGuesses.length}.png" alt="Hangman">`;
};

async function selectName() {
    let name = document.getElementById('name').value;
    if (name) {
        const request = await fetch('https://jimishangmanapi.herokuapp.com/register', {
            method: 'GET',
            headers: {
                'Authorization': name
            }
        });
        if (request.status == 200) {

            localStorage.setItem('name', name);
            document.getElementById('login').style.display = "none";
        } else {
            document.getElementById('loginErrors').innerHTML = "Name ist bereits vergeben!";
        }
    } else {
        document.getElementById('loginErrors').innerHTML = "Bitte Namen eingeben!";
    }
}

function registerGame() {
    let name = localStorage.getItem('name');
    let stats = localStorage.getItem('stats');
    fetch('https://jimishangmanapi.herokuapp.com/game', {
        method: 'POST',
        headers: {
            'Authorization': name
        },
        body: stats
    }).then(request => {
        if (request.status == 200) {
            console.log("Game registered!");
        } else {
            document.getElementById('errors').innerHTML = "Fehler beim Registrieren des Spiels!";
        }
    });
}

function clearGuess() {
    document.getElementById('guessIn').value = "";
}
function clearErrors() {
    document.getElementById('errors').innerHTML = "";
}

function toUtf8(string) {
    document.getElementById('showWord').innerHTML = string;
    string = document.getElementById('showWord').innerHTML;
    document.getElementById('showWord').innerHTML = "";
    return string;
}
function updateStats() {
    let stats = JSON.parse(localStorage.getItem('stats'));
        document.getElementById('stats').innerHTML = `<h1>Statistiken:</h1><p>Gespielte Spiele: ${stats.games}</p><p>Gewonnene Spiele: ${stats.wins}</p><p>Verlorene Spiele: ${stats.losses}</p><p>Streak: ${stats.streak}</p>`;
}

function initLB() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    fetch('https://jimishangmanapi.herokuapp.com/players', {
        method: 'GET'
    }).then(async request => {
        const response = await request.json();
        let keys = Object.keys(response);
        for (let i = 0; i < keys.length; i++) {
            let player = response[keys[i]];
            if (!player.streak) {
                player.streak = 0;
            }
            if (!player.games) {
                player.games = 0;
            }
            if (!player.wins) {
                player.wins = 0;
            }
            if (!player.losses) {
                player.losses = 0;
            }
            if (keys[i] == name) {
                document.getElementById('lb').innerHTML += `<tr><td><a>${keys[i]}</a></td><td>${player.streak}</td><td>${player.games}</td><td>${player.wins}</td><td>${player.losses}</td></tr>`;
            } else {
                document.getElementById('lb').innerHTML += `<tr><td>${keys[i]}</td><td>${player.streak}</td><td>${player.games}</td><td>${player.wins}</td><td>${player.losses}</td></tr>`;
            }
        }
    });
}