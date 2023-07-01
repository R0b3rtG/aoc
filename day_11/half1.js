let monkeys = [];

let data = `Monkey 0:
  Starting items: 77, 69, 76, 77, 50, 58
  Operation: new = old * 11
  Test: divisible by 5
    If true: throw to monkey 1
    If false: throw to monkey 5

Monkey 1:
  Starting items: 75, 70, 82, 83, 96, 64, 62
  Operation: new = old + 8
  Test: divisible by 17
    If true: throw to monkey 5
    If false: throw to monkey 6

Monkey 2:
  Starting items: 53
  Operation: new = old * 3
  Test: divisible by 2
    If true: throw to monkey 0
    If false: throw to monkey 7

Monkey 3:
  Starting items: 85, 64, 93, 64, 99
  Operation: new = old + 4
  Test: divisible by 7
    If true: throw to monkey 7
    If false: throw to monkey 2

Monkey 4:
  Starting items: 61, 92, 71
  Operation: new = old * old
  Test: divisible by 3
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 5:
  Starting items: 79, 73, 50, 90
  Operation: new = old + 2
  Test: divisible by 11
    If true: throw to monkey 4
    If false: throw to monkey 6

Monkey 6:
  Starting items: 50, 89
  Operation: new = old + 3
  Test: divisible by 13
    If true: throw to monkey 4
    If false: throw to monkey 3

Monkey 7:
  Starting items: 83, 56, 64, 58, 93, 91, 56, 65
  Operation: new = old + 5
  Test: divisible by 19
    If true: throw to monkey 1
    If false: throw to monkey 0`;

class Monkey {
	constructor(
		index,
		items,
		operationSign,
		operand,
		divTest,
		trueCase,
		falseCase
	) {
		this.index = index;
		this.items = items;
		this.operationSign = operationSign;
		this.operand = operand;
		this.divTest = divTest;
		this.trueCase = trueCase;
		this.falseCase = falseCase;
		this.inspectedItems = 0;
	}

	doTurn() {
		for (let item of this.items) {
			this.inspectedItems++;
			let newItem;
			if (this.operationSign == '*') {
				if (this.operand == 'old') newItem = item * item;
				else newItem = item * this.operand;
			} else {
				if (this.operand == 'old') newItem = item + item;
				else newItem = item + this.operand;
			}
			newItem = Math.floor(newItem / 3);
			if (newItem % this.divTest == 0)
				monkeys[this.trueCase].items.push(newItem);
			else monkeys[this.falseCase].items.push(newItem);
		}
		this.items = [];
	}
}

let monkeyInfo = data.split('\n\n');
for (let info of monkeyInfo) {
	let monkeyIndex;
	let startingItems = [];
	let operationSign;
	let operand;
	let divTest;
	let trueCase;
	let falseCase;
	let lines = info.split('\n');
	lines.forEach((line, index) => {
		let bits = line.split(' ');

		if (index % 6 == 0) monkeyIndex = parseInt(bits[1]);

		if (index % 6 == 1) {
			for (let bit of bits) {
				let number = parseInt(bit);
				if (!isNaN(number)) startingItems.push(number);
			}
		}

		if (index % 6 == 2) {
			operationSign = bits[bits.length - 2];
			operand =
				bits[bits.length - 1] == 'old'
					? 'old'
					: parseInt(bits[bits.length - 1]);
		}

		if (index % 6 == 3) divTest = parseInt(bits[bits.length - 1]);

		if (index % 6 == 4) trueCase = parseInt(bits[bits.length - 1]);
		if (index % 6 == 5) falseCase = parseInt(bits[bits.length - 1]);
	});

	let monkey = new Monkey(
		monkeyIndex,
		startingItems,
		operationSign,
		operand,
		divTest,
		trueCase,
		falseCase
	);

	monkeys.push(monkey);
}

for (let i = 0; i < 20; i++) {
	for (let monkey of monkeys) {
		monkey.doTurn();
	}
}

let inspectedItems = [];
for (let monkey of monkeys) {
	inspectedItems.push(monkey.inspectedItems);
}

inspectedItems.sort((a, b) => b - a);
let levelOfMonkeyBusiness = inspectedItems[0] * inspectedItems[1];
console.log(levelOfMonkeyBusiness);
