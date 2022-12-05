let fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	let stacks = [
		['R', 'P', 'C', 'D', 'B', 'G'],
		['H', 'V', 'G'],
		['N', 'S', 'Q', 'D', 'J', 'P', 'M'],
		['P', 'S', 'L', 'G', 'D', 'C', 'N', 'M'],
		['J', 'B', 'N', 'C', 'P', 'F', 'L', 'S'],
		['Q', 'B', 'D', 'Z', 'V', 'G', 'T', 'S'],
		['B', 'Z', 'M', 'H', 'F', 'T', 'Q'],
		['C', 'M', 'D', 'B', 'F'],
		['F', 'C', 'Q', 'G'],
	];

	let instructions = data.split('\r\n');

	for (line of instructions) {
		line = line.split(' ');
		let numberOfCrates = parseInt(line[1], 10);
		let from = parseInt(line[3], 10) - 1;
		let to = parseInt(line[5], 10) - 1;

		stacks[to] = [
			...stacks[to],
			...stacks[from].splice(stacks[from].length - numberOfCrates),
		];
	}

	let result = '';
	for (let i = 0; i < stacks.length; i++) {
		result += stacks[i][stacks[i].length - 1];
	}

	console.log(result);
});
