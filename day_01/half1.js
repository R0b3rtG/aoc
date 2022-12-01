let fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	let numbers = data.split('\n');

	let max = 0;
	let sum = 0;

	numbers.forEach((number) => {
		if (number.length > 2) {
			sum = sum + parseInt(number);
		} else {
			max = sum > max ? sum : max;
			sum = 0;
		}
	});
	console.log(max);
});
