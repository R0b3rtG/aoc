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

	const TOTAL_DISK_SPACE = 70000000;
	const SPACE_NEEDED_TO_INSTALL = 30000000;

	let lines = data.split('\r\n');

	let min = Infinity;

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
	const AVAILABLE_SPACE = TOTAL_DISK_SPACE - root.size;

	smallestFit(root);

	console.log(min);

	function sizeOfDir(dir) {
		for (let child of dir.next) {
			if (child.next != null) sizeOfDir(child);
			dir.size += child.size;
		}
	}

	function smallestFit(dir) {
		if (dir.next == null) return;
		if (dir.size + AVAILABLE_SPACE >= SPACE_NEEDED_TO_INSTALL && dir.size < min)
			min = dir.size;
		for (let child of dir.next) smallestFit(child);
	}
});
