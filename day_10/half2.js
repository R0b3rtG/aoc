const output = document.querySelector('.output');

let data = `noop
addx 7
addx -1
addx -1
addx 5
noop
noop
addx 1
addx 3
addx 2
noop
addx 2
addx 5
addx 2
addx 10
addx -9
addx 4
noop
noop
noop
addx 3
addx 5
addx -40
addx 26
addx -23
addx 2
addx 5
addx 26
addx -35
addx 12
addx 2
addx 17
addx -10
addx 3
noop
addx 2
addx 3
noop
addx 2
addx 3
noop
addx 2
addx 2
addx -39
noop
addx 15
addx -12
addx 2
addx 10
noop
addx -1
addx -2
noop
addx 5
noop
addx 5
noop
noop
addx 1
addx 4
addx -25
addx 26
addx 2
addx 5
addx 2
noop
addx -3
addx -32
addx 1
addx 4
addx -2
addx 3
noop
noop
addx 3
noop
addx 6
addx -17
addx 27
addx -7
addx 5
addx 2
addx 3
addx -2
addx 4
noop
noop
addx 5
addx 2
addx -39
noop
noop
addx 2
addx 5
addx 3
addx -2
addx 2
addx 11
addx -4
addx -5
noop
addx 10
addx -18
addx 19
addx 2
addx 5
addx 2
addx 2
addx 3
addx -2
addx 2
addx -37
noop
addx 5
addx 4
addx -1
noop
addx 4
noop
noop
addx 1
addx 4
noop
addx 1
addx 2
noop
addx 3
addx 5
noop
addx -3
addx 5
addx 5
addx 2
addx 3
noop
addx -32
noop`;

let X = 1;
let currentCycle = 0;
let positionX = 0;
let CRT = [];
let instructions = data.split('\n');

for (let instruction of instructions) {
	let bits = instruction.split(' ');

	if (bits[0] == 'noop') {
		doCycle(bits[1], false);
	} else {
		doCycle(bits[1], false);
		doCycle(bits[1], true);
	}
}

for (i = 0; i < CRT.length; i++) {
	output.innerHTML += CRT[i];
	if (i % 40 == 39) output.innerHTML += '<br>';
}

function doCycle(number, isSecondCycle) {
	currentCycle++;
	CRT[positionX] =
		positionX % 40 >= X - 1 && positionX % 40 <= X + 1 ? '#' : '.';
	positionX += 1;

	if (isSecondCycle) X += parseInt(number);
}
