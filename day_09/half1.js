let fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	let mainTable = [];
	let trailTable = [];
	for (let i = 0; i < 500; i++) {
		mainTable[i] = [];
		trailTable[i] = [];
	}

	for (let i = 0; i < 500; i++) {
		for (let j = 0; j < 500; j++) {
			mainTable[i][j] = '.';
			trailTable[i][j] = '.';
		}
	}

	let is = 250;
	let js = 250;
	let iT = 250;
	let jT = 250;
	let iH = 250;
	let jH = 250;
	mainTable[iH][jH] = 'H';

	let instructions = data.split('\r\n');
	for (let instruction of instructions) {
		let bits = instruction.split(' ');
		for (let i = 0; i < parseInt(bits[1]); i++) {
			mainTable[iH][jH] = '.';

			if (bits[0] == 'U') iH--;
			if (bits[0] == 'R') jH++;
			if (bits[0] == 'D') iH++;
			if (bits[0] == 'L') jH--;

			mainTable[is][js] = 's';
			trailTable[iT][jT] = '#';
			mainTable[iT][jT] = '.';

			if (!isTailInProximity(iH, jH, iT, jT)) {
				if (iH > iT) iT++;
				if (iH < iT) iT--;
				if (jH > jT) jT++;
				if (jH < jT) jT--;
			}

			mainTable[iT][jT] = 'T';
			mainTable[iH][jH] = 'H';
		}
	}
	trailTable[iT][jT] = '#';

	let positionsPassedByTail = 0;
	for (let row of trailTable)
		for (let element of row) if (element == '#') positionsPassedByTail++;

	console.log(positionsPassedByTail);

	function isTailInProximity(iH, jH, iT, jT) {
		if (iT <= iH + 1 && iT >= iH - 1 && jT <= jH + 1 && jT >= jH - 1)
			return true;
		return false;
	}
});
