function init() {
    fetch('https://horstcors.herokuapp.com/https://alex-riedel.de/randV2.php?anz=1', {
        method: 'GET'
    }).then(async request => {
        const response = await request.json();
        const word = toUtf8(response[0]).toLowerCase();
        localStorage.setItem('word', word);
        localStorage.setItem('wrongGuesses', JSON.stringify([]));
        console.log(word);
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
        }
    } else {
        document.getElementById('errors').innerHTML = "Buchstabe nicht vorhanden!";
        wrongGuesses.push(guess);
        localStorage.setItem('wrongGuesses', JSON.stringify(wrongGuesses));
        document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(", ");
        if (wrongGuesses.length >= 6) {
            document.getElementById('word').innerHTML = word;
            document.getElementById('errors').innerHTML = 'Du hast leider verloren! Versuche es nochmal!<br><button onclick="location.reload()">Neues Spiel</button>';
        };
        clearGuess();
    }

    document.getElementById('currentHangman').innerHTML = `<img src="./hangmen/${wrongGuesses.length}.png" alt="Hangman">`;
};

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