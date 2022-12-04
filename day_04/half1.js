let fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
		return;
	}

	let pairs = data.split('\r\n');

	let numOfOverlappingRanges = 0;
	pairs.forEach((pair) => {
		let ranges = pair.split(',');
		let rangeEnds = [...ranges[0].split('-'), ...ranges[1].split('-')];
		if (
			(parseInt(rangeEnds[0]) >= parseInt(rangeEnds[2]) &&
				parseInt(rangeEnds[1]) <= parseInt(rangeEnds[3])) ||
			(parseInt(rangeEnds[0]) <= parseInt(rangeEnds[2]) &&
				parseInt(rangeEnds[1]) >= parseInt(rangeEnds[3]))
		) {
			console.log(rangeEnds);
			numOfOverlappingRanges++;
		}
	});

	console.log(numOfOverlappingRanges);
});
