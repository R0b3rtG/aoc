let fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	let mainTable = [];
	let trailTable = [];
	for (let i = 0; i < 1000; i++) {
		mainTable[i] = [];
		trailTable[i] = [];
	}

	for (let i = 0; i < 1000; i++) {
		for (let j = 0; j < 1000; j++) {
			mainTable[i][j] = '.';
			trailTable[i][j] = '.';
		}
	}

	let s = {
		i: 500,
		j: 500,
	};

	let knots = [
		{ i: 500, j: 500 },
		{ i: 500, j: 500 },
		{ i: 500, j: 500 },
		{ i: 500, j: 500 },
		{ i: 500, j: 500 },
		{ i: 500, j: 500 },
		{ i: 500, j: 500 },
		{ i: 500, j: 500 },
		{ i: 500, j: 500 },
		{ i: 500, j: 500 },
	];

	mainTable[knots[0].i][knots[0].j] = 'H';

	let instructions = data.split('\r\n');
	for (let instruction of instructions) {
		let bits = instruction.split(' ');
		for (let i = 0; i < parseInt(bits[1]); i++) {
			mainTable[knots[0].i][knots[0].j] = '.';

			if (bits[0] == 'U') knots[0].i--;
			if (bits[0] == 'R') knots[0].j++;
			if (bits[0] == 'D') knots[0].i++;
			if (bits[0] == 'L') knots[0].j--;

			mainTable[s.i][s.i] = 's';
			trailTable[knots[9].i][knots[9].j] = '#';
			for (let i = 1; i < knots.length; i++)
				mainTable[knots[i].i][knots[i].j] = '.';

			for (let i = 0; i < knots.length - 1; i++) {
				let knot1 = knots[i];
				let knot2 = knots[i + 1];
				if (!isTailInProximity(knot1.i, knot1.j, knot2.i, knot2.j)) {
					if (knot1.i > knot2.i) knot2.i++;
					if (knot1.i < knot2.i) knot2.i--;
					if (knot1.j > knot2.j) knot2.j++;
					if (knot1.j < knot2.j) knot2.j--;
				}
			}

			for (let i = 1; i < knots.length; i++)
				mainTable[knots[i].i][knots[i].j] = i;
			mainTable[knots[0].i][knots[0].j] = 'H';
		}
	}
	trailTable[knots[9].i][knots[9].j] = '#';

	let positionsPassedByTail = 0;
	for (let row of trailTable)
		for (let element of row) if (element == '#') positionsPassedByTail++;

	console.log(positionsPassedByTail);

	function isTailInProximity(i1, j1, i2, j2) {
		if (i2 <= i1 + 1 && i2 >= i1 - 1 && j2 <= j1 + 1 && j2 >= j1 - 1)
			return true;
		return false;
	}
});
