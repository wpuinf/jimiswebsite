let regex = {
    bic: /[A-Z]{4}DE[A-Z0-9]{2}([0-9]{3})?/,
    iban: /DE\d{2}( )?(\d{4}\1){4}\d{2}/,
    year: /20[0-9]{2}/,
    class: /([5-9]|1[0-2])(.|\/)[1-5]/,
    email: /^\S+@\S+\.\S+$/
}

let inputs = ['renterSurname', 'renterFirstName', 'renterTelephone', 'userSurname', 'userFirstName', 'userTelephone', 'userHeight', 'child', 'owner', 'bank', 'applys'];
let regexInputs = [{name: 'renterEmail', regex: regex.email}, {name: 'userEmail', regex: regex.email}, {name: 'beginYear', regex: regex.year}, {name: 'beginClass', regex: regex.class}, {name: 'iban', regex: regex.iban}, {name: 'bic', regex: regex.bic}];

document.getElementById('beginYear').value = new Date().getFullYear();

function submit() {
    let gtg = true;

    for (let input of inputs) {
        input = document.getElementById(input);
        if (!input.value) {
            input.labels[0].style.color = 'red';
            gtg = false;
        } else {
            input.labels[0].style.color = 'black';
        }
    }

    for (let regexInput of regexInputs) {
        let input = document.getElementById(regexInput.name);
        if (!regexInput.regex.test(input.value)) {
            input.labels[0].style.color = 'red';
            gtg = false;
        } else {
            input.labels[0].style.color = 'black';
        }
    }

    if (!document.getElementsByName('size')[0].checked && !document.getElementsByName('size')[1].checked) {
        document.getElementById('sizeLabel').style.color = 'red';
        gtg = false;
    } else {
        document.getElementById('sizeLabel').style.color = 'black';
    }

    if(!document.getElementById('readContract').checked) {
        document.getElementById('readContract').labels[0].style.color = 'red';
        gtg = false;
    } else {
        document.getElementById('readContract').labels[0].style.color = 'black';
    }

    if (gtg) {
        let data = {
            "renter": {
                "firstName": document.getElementById('renterFirstName').value,
                "surname": document.getElementById('renterSurname').value,
                "contact": {
                    "email": document.getElementById('renterEmail').value,
                    "phone": document.getElementById('renterTelephone').value
                }
            },
            "user": {
                "firstName": document.getElementById('userFirstName').value,
                "surname": document.getElementById('userSurname').value,
                "height": document.getElementById('userHeight').value,
                "contact": {
                    "email": document.getElementById('userEmail').value,
                    "phone": document.getElementById('userTelephone').value
                }
            },
            "beginYear": document.getElementById('beginYear').value,
            "beginClass": document.getElementById('beginClass').value,
            "size": document.getElementsByName('size').values,
            "sepa": {
                "forChild": document.getElementById('child').value,
                "name": document.getElementById('owner').value,
                "bankName": document.getElementById('bank').value,
                "iban": document.getElementById('iban').value,
                "bic": document.getElementById('bic').value,
                "applysFrom": document.getElementById('applys').value
            }
        }

        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}