const letters = document.querySelectorAll('input.letter');
for (let i = 0; i < letters.length; i++) {
    // If the max length is reached, focus on the next input
    letters[i].addEventListener('input', function () {
        if (this.value.length >= this.maxLength && letters[i + 1]?.value.length === 0) {
            if (i < letters.length - 1) {
                letters[i + 1].focus();
            }
        }
    });
    // If the backspace key is pressed and the input is empty, focus on the previous input
    letters[i].addEventListener('keydown', function (e) {
        const BACKSPACE_KEYCODE = 8;
        const ARROW_LEFT_KEYCODE = 37;
        const ARROW_RIGHT_KEYCODE = 39;

        if (e.keyCode === BACKSPACE_KEYCODE) {
            if (this.value.length === 0) {
                if (i > 0) {
                    letters[i - 1].focus();
                    let tmp = letters[i - 1].value;
                    letters[i - 1].value = '';
                    letters[i - 1].value = tmp;
                    e.preventDefault();
                }
            }
        }
        if (e.keyCode === ARROW_LEFT_KEYCODE && this.selectionStart === 0) {
            if (i > 0) {
                letters[i - 1].focus();
                e.preventDefault();
            }
        }
        if (e.keyCode === ARROW_RIGHT_KEYCODE && this.selectionEnd === this.value.length) {
            if (i < letters.length - 1) {
                letters[i + 1].focus();
                e.preventDefault();
            }
        }
    });
}

function getIBAN() {
    const letters = document.querySelectorAll('input.iban.letter');
    let iban = 'DE';
    for (const letter of letters) {
        iban += letter.value;
        if (letter.nextElementSibling.tagName === 'P') {
            iban += ' ';
        }
    }
    return iban;
}