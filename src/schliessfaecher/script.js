const inputs = document.querySelectorAll('input[type="text"]');
const enterKeyCode = 13;
const regex = {
    bic: /[A-Z]{4}DE[A-Z0-9]{2}([0-9]{3})?/,
    iban: /DE\d{2}( )?(\d{4}\1){4}\d{2}/,
    year: /20[0-9]{2}/,
    class: /([5-9]|1[0-2])(.|\/)[1-5]/,
    email: /^\S+@\S+\.\S+$/
}

const noRegex = ['renterLastName', 'renterFirstName', 'renterPhone', 'userLastName', 'userFirstName', 'userPhone', 'sepa-childName', 'sepa-name', 'sepa-bankName', 'sepa-date', 'userHeight', 'beginYear'];
const hasRegex = [{'id': 'renterEmail', 'regex': regex.email}, {'id': 'userEmail', 'regex': regex.email}, {'id': 'beginClass', 'regex': regex.class}];

document.getElementById('contractText').style.display = 'none';

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keydown', (e) => {
        if (e.keyCode === enterKeyCode) {
            inputs[i].blur();
            if (inputs[i + 1]) inputs[i + 1].focus();
        }
    });
}

function getBoxes(id) {
    let num = '';
    const elements = document.querySelectorAll(`${id} input`);
    for (const element of elements) {
        num += element.value;
    }
    return num;
}

function submit() {
    let gtg = true;
    for (const element of noRegex) {
        if (!document.getElementById(element).value) {
            document.getElementById(element).parentElement.classList.add('error');
            gtg = false;
        } else {
            document.getElementById(element).parentElement.classList.remove('error');
        }
    }

    for (const element of hasRegex) {
        if (!document.getElementById(element.id).value.match(element.regex)) {
            document.getElementById(element.id).parentElement.classList.add('error');
            gtg = false;
        } else {
            document.getElementById(element.id).parentElement.classList.remove('error');
        }
    }

    const iban = `DE${getBoxes('#iban-input')}`;
    const bic = getBoxes('#bic-input');

    if (!iban.match(regex.iban)) {
        document.getElementById('iban-label').classList.add('error');
        gtg = false;
    } else {
        document.getElementById('iban-label').classList.remove('error');
    }

    if (!bic.match(regex.bic)) {
        document.getElementById('bic-label').classList.add('error');
        gtg = false;
    } else {
        document.getElementById('bic-label').classList.remove('error');
    }

    if (gtg) {
        fetch('https://jimiswebsite-api.herokuapp.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                renter: {
                    firstName: document.getElementById('renterFirstName').value,
                    lastName: document.getElementById('renterLastName').value,
                    contact: {
                        email: document.getElementById('renterEmail').value,
                        phone: document.getElementById('renterPhone').value
                    }
                },
                user: {
                    firstName: document.getElementById('userFirstName').value,
                    lastName: document.getElementById('userLastName').value,
                    height: parseInt(document.getElementById('userHeight').value),
                    contact: {
                        email: document.getElementById('userEmail').value,
                        phone: document.getElementById('userPhone').value
                    }
                },
                beginYear: parseInt(document.getElementById('beginYear').value),
                beginClass: document.getElementById('beginClass').value,
                size: document.querySelector('input[name=size]:checked').value ,
                sepa: {
                    forChild: document.getElementById('sepa-childName').value,
                    name: document.getElementById('sepa-name').value,
                    bankName: document.getElementById('sepa-bankName').value,
                    iban: iban,
                    bic: bic,
                    applysFrom: document.getElementById('sepa-date').value
                }
            })
        }).then(request =>  {
            if (request.status === 200) alert('Anfrage wurde erfolgreich gespeichert.');
            else alert('Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal oder wende dich an (EMAIL).');
        });
    }
}

function changeContractVisibility() {
    if (document.getElementById('contractText').style.display === 'none') {
        document.getElementById('contractText').style.display = 'block';
        document.getElementById('showContract').innerHTML = '▲ <span>Vertrag ausblenden</span>';
    } else {
        document.getElementById('contractText').style.display = 'none';
        document.getElementById('showContract').innerHTML = '▼ <span>Vertrag anzeigen</span>';
    }
};