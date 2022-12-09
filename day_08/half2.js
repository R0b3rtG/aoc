let fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	let numOfVisibleTrees = 0;

	let treeMap = [];
	let max = 0;
	let rows = data.split('\r\n');

	for (let row of rows) treeMap = [...treeMap, row.split('')];

	numOfVisibleTrees =
		treeMap.length * treeMap[0].length -
		(treeMap.length - 2) * (treeMap[0].length - 2);

	for (let i = 1; i < treeMap.length - 1; i++) {
		for (let j = 1; j < treeMap[0].length - 1; j++) {
			let score = scenicScore(i, j);
			if (score > max) max = score;
		}
	}

	console.log(max);

	function scenicScore(i, j) {
		let topScore = 0;
		let rightScore = 0;
		let leftScore = 0;
		let bottomScore = 0;

		let x = treeMap[i][j];

		let y;
		y = 0;
		for (let k = i - 1; k >= 0; k--)
			if (treeMap[k][j] >= x) {
				y = k;
				break;
			}
		topScore = i - y;

		y = treeMap.length - 1;
		for (let k = i + 1; k < treeMap.length; k++)
			if (treeMap[k][j] >= x) {
				y = k;
				break;
			}
		bottomScore = y - i;

		y = 0;
		for (let k = j - 1; k >= 0; k--)
			if (treeMap[i][k] >= x) {
				y = k;
				break;
			}
		leftScore = j - y;

		y = treeMap[0].length - 1;
		for (let k = j + 1; k < treeMap[0].length; k++)
			if (treeMap[i][k] >= x) {
				y = k;
				break;
			}
		rightScore = y - j;

		return topScore * rightScore * bottomScore * leftScore;
	}
});
