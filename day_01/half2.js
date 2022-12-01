let fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	let numbers = data.split('\n');

	let max = 0;
	let sum = 0;
	let calories = [0];

	numbers.forEach((number) => {
		if (number.length > 2) {
			sum = sum + parseInt(number);
		} else {
			if (sum > calories[calories.length - 1]) calories.push(sum);
			sum = 0;
		}
	});
	let len = calories.length;
	let caloriesSum = calories[len - 1] + calories[len - 2] + calories[len - 3];
	console.log(caloriesSum);
});
