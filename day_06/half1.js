let fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	for (let i = 3; i < data.length; i++) {
		if (hasFoundSequence(data, i)) {
			console.log(i + 1);
			break;
		}
	}
});

function hasFoundSequence(data, i) {
	for (let j = i - 3; j < i; j++)
		for (let k = j + 1; k <= i; k++) if (data[j] == data[k]) return false;

	return true;
}
