let lockers;
fetch('http://localhost:3000/lockers')
	.then(response => response.json())
	.then(data => {
		lockers = data;
	})
	.catch(error => console.error(error));

const statusTranslations = {
	'free': 'Frei',
	'occupied': 'Belegt',
	'expired-soon': 'Noch 3 Monate',
	'expired': 'Abgelaufen',
	'broken': 'Defekt',
}

function generateLockers(amount) {
	const firstNames = ['Max', 'Monika', 'Paul', 'Sandra', 'Tim', 'Ursula', 'Viktor', 'Wilfried', 'Wilhelm', 'Wolfgang', 'Yannick'];
	const lastNames = ['Mustermann', 'Müller', 'Schmidt', 'Schneider', 'Fischer', 'Hoffmann', 'Koch', 'Schulz', 'Werner', 'Schäfer', 'Meyer'];
	const states = ['free', 'occupied', 'expired-soon', 'expired', 'broken'];

	const lockers = [];
	for (let i = 1; i <= amount; i++) {
		let locker = {};
		const status = states[Math.floor(Math.random() * states.length)];
		locker.status = status;
		locker.number = i;
		if (status !== 'free' && status !== 'broken') {
			const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
			const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
			locker.name = `${firstName} ${lastName}`;
		}
		lockers.push(locker);
	}
	return lockers;
}

lockers = generateLockers(600);

function newLockerItem(number, status) {
	let item = document.createElement('li');
	let locker = document.createElement('span');

	locker.classList.add('locker-item');
	locker.innerText = number;
	locker.classList.add(status);

	item.appendChild(locker);

	return item;
}

function generateLockersTable(lockers) {
	const list = document.querySelector('#table ol');

	for (const locker of lockers) {
		const lockerItem = newLockerItem(locker.number, locker.status);
		list.appendChild(lockerItem);
	}
}

generateLockersTable(lockers);

function generateLockersList(lockers) {
	const table = document.querySelector('.list');

	for (const locker of lockers) {
		const listEntry = newListEntry(locker);
		table.appendChild(listEntry);
	}

}

function newListEntry(locker) {
	let entry = document.createElement('div');
	entry.classList.add('row');

	let number = document.createElement('div');
	number.classList.add('col');
	number.classList.add('number');
	let name = document.createElement('div');
	name.classList.add('col');
	name.classList.add('name');
	let status = document.createElement('div');
	status.classList.add('col');
	status.classList.add('status');

	number.innerText = locker.number;
	name.innerText = locker.name ?? '-';
	status.innerText = statusTranslations[locker.status] ?? '-';

	entry.classList.add(locker.status);

	entry.appendChild(number);
	entry.appendChild(name);
	entry.appendChild(status);

	return entry;
}


generateLockersList(lockers);




function setViewTable() {
	document.querySelectorAll('#view-selection .active').forEach(element => element.classList.remove('active'));
	document.querySelector('#selection-table').classList.add('active');
	document.querySelector('#selection-list').classList.remove('active');


	document.querySelectorAll('.list-view').forEach(element => element.classList.add('hidden'));
	document.querySelectorAll('.table-view').forEach(element => element.classList.remove('hidden'));
}

function setViewList() {
	document.querySelectorAll('#view-selection .active').forEach(element => element.classList.remove('active'));
	document.querySelector('#selection-table').classList.remove('active');
	document.querySelector('#selection-list').classList.add('active');

	document.querySelectorAll('.table-view').forEach(element => element.classList.add('hidden'));
	document.querySelectorAll('.list-view').forEach(element => element.classList.remove('hidden'));
}


setViewTable();