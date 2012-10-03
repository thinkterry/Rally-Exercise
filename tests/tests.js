test('sanity test', function () {
	ok(true === true, 'true is true');
});

test('integer tests', function () {
	strictEqual(convert(0), 'Zero');
	strictEqual(convert(1), 'One');
	strictEqual(convert(2), 'Two');
	strictEqual(convert(9), 'Nine');
	strictEqual(convert(10), 'Ten');
	strictEqual(convert(11), 'Eleven');
	strictEqual(convert(20), 'Twenty');
	strictEqual(convert(21), 'Twenty-one');
	strictEqual(convert(22), 'Twenty-two');
	strictEqual(convert(30), 'Thirty');
	strictEqual(convert(31), 'Thirty-one');
	strictEqual(convert(50), 'Fifty');
	strictEqual(convert(55), 'Fifty-five');
	strictEqual(convert(86), 'Eighty-six');
	strictEqual(convert(99), 'Ninety-nine');
	strictEqual(convert(100), 'One hundred');
	strictEqual(convert(101), 'One hundred one');
	strictEqual(convert(102), 'One hundred two');
	strictEqual(convert(200), 'Two hundred');
	strictEqual(convert(201), 'Two hundred one');
	strictEqual(convert(830), 'Eight hundred thirty');
	strictEqual(convert(839), 'Eight hundred thirty-nine');
	strictEqual(convert(999), 'Nine hundred ninety-nine');
	strictEqual(convert(1000), 'One thousand');
	strictEqual(convert(1001), 'One thousand one');
	strictEqual(convert(1010), 'One thousand ten');
	strictEqual(convert(1100), 'One thousand one hundred');
	strictEqual(convert(1101), 'One thousand one hundred one');
	strictEqual(convert(2000), 'Two thousand');
	strictEqual(convert(2438), 'Two thousand four hundred thirty-eight');
	strictEqual(convert(2413), 'Two thousand four hundred thirteen');
	strictEqual(convert(9999), 'Nine thousand nine hundred ninety-nine');
});

test('decimal tests', function () {
	strictEqual(convert(1.11), 'One and 11/100');
	strictEqual(convert(1.10), 'One and 10/100');
	strictEqual(convert(1.01), 'One and 01/100');
	strictEqual(convert(10.02), 'Ten and 02/100');
	//strictEqual(convert(0.02), 'Zero and 02/100');
});

test('error bounds tests', function () {
	strictEqual(convert(10000), 'Amount too large (valid range: 0-9999.99)');
	strictEqual(convert(-1), 'Amount too small (valid range: 0-9999.99)')
	// TODO Add decimal tests for 9999.999 and 0.001
	// TODO Add check for NaN (http://stackoverflow.com/a/175787)
	// TODO Add check for too many decimals (compare number to roundNumber(number))
});

test('digits tests', function () {
	deepEqual(getDigits(0), [0]);
	deepEqual(getDigits(1), [1]);
	deepEqual(getDigits(10), [1, 0]);
	deepEqual(getDigits(100), [1, 0, 0]);
	deepEqual(getDigits(111), [1, 1, 1]);
	deepEqual(getDigits(1000), [1, 0, 0, 0]);
	//deepEqual(getDigits(1.50), [1, '.', 5, 0]); // Illegal
});

test('round tests', function () {
	strictEqual(roundNumber(1.22, 2), 1.22);
	strictEqual(roundNumber(1.009, 2), 1.01);
	strictEqual(roundNumber(.00, 2), 0.00);
	strictEqual(roundNumber(.01, 2), 0.01);
	strictEqual(roundNumber(.1, 2), 0.10);
	strictEqual(roundNumber(1, 2), 1.00);
	
});