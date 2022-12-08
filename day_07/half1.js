let fs = require('fs');

class Directiory {
	constructor(name, prev, next, size) {
		this.name = name;
		this.prev = prev;
		this.next = next;
		this.size = size;
	}
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	const MAX_SIZE = 100000;

	let totalSum = 0;
	let lines = data.split('\r\n');

	let root = new Directiory('/', null, [], 0);
	let currentDir = root;

	for (let line of lines) {
		let components = line.split(' ');
		if (components[0] == '$') {
			if (components[1] == 'cd') {
				if (components[2] == '..') currentDir = currentDir.prev;
				else {
					for (dir of currentDir.next)
						if (dir.name == components[2]) currentDir = dir;
				}
			}
		} else {
			let newDir = new Directiory(
				components[1],
				currentDir,
				parseInt(components[0]) ? null : [],
				parseInt(components[0]) ? parseInt(components[0]) : 0
			);
			currentDir.next.push(newDir);
		}
	}

	sizeOfDir(root);
	sum(root);
	console.log(totalSum);

	function sizeOfDir(dir) {
		for (let child of dir.next) {
			if (child.next != null) sizeOfDir(child);
			dir.size += child.size;
		}
	}

	function sum(dir) {
		if (dir.next == null) return;
		if (dir.size <= MAX_SIZE) totalSum += dir.size;
		for (let child of dir.next) sum(child);
	}
});
