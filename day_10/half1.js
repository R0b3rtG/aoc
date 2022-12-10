let fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	let X = 1;
	let cycle = 0;
	let sum = 0;
	let instructions = data.split('\r\n');

	for (let instruction of instructions) {
		let bits = instruction.split(' ');

		if (bits[0] == 'noop') {
			doCycle(bits[1], false);
		} else {
			doCycle(bits[1], false);
			doCycle(bits[1], true);
		}
	}

	console.log(sum);

	function doCycle(number, isSecondCycle) {
		cycle++;
		if ((cycle - 20) % 40 == 0) sum += cycle * X;

		if (isSecondCycle) X += parseInt(number);
	}
});
