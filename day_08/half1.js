let fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	let numOfVisibleTrees = 0;

	let treeMap = [];

	let rows = data.split('\r\n');

	for (let row of rows) treeMap = [...treeMap, row.split('')];

	numOfVisibleTrees =
		treeMap.length * treeMap[0].length -
		(treeMap.length - 2) * (treeMap[0].length - 2);

	for (let i = 1; i < treeMap.length - 1; i++) {
		for (let j = 1; j < treeMap[0].length - 1; j++) {
			if (isVisible(i, j)) numOfVisibleTrees++;
		}
	}

	console.log(numOfVisibleTrees);

	function isVisible(i, j) {
		let topHidden = false;
		let rightHidden = false;
		let leftHidden = false;
		let bottomHidden = false;

		for (let k = 0; k < i; k++)
			if (treeMap[k][j] >= treeMap[i][j]) topHidden = true;

		for (let k = i + 1; k < treeMap.length; k++)
			if (treeMap[k][j] >= treeMap[i][j]) bottomHidden = true;

		for (let k = 0; k < j; k++)
			if (treeMap[i][k] >= treeMap[i][j]) leftHidden = true;

		for (let k = j + 1; k < treeMap[0].length; k++)
			if (treeMap[i][k] >= treeMap[i][j]) rightHidden = true;

		return !(topHidden && rightHidden && bottomHidden && leftHidden);
	}
});
