test('sanity test', function () {
	ok(true === true, 'true is true');
});

test('integer tests', function () {
	strictEqual(convert(0), 'Zero dollars');
	strictEqual(convert(1), 'One dollar');
	strictEqual(convert('1'), 'One dollar');
	strictEqual(convert(2), 'Two dollars');
	strictEqual(convert(9), 'Nine dollars');
	strictEqual(convert(10), 'Ten dollars');
	strictEqual(convert(11), 'Eleven dollars');
	strictEqual(convert(20), 'Twenty dollars');
	strictEqual(convert(21), 'Twenty-one dollars');
	strictEqual(convert(22), 'Twenty-two dollars');
	strictEqual(convert(30), 'Thirty dollars');
	strictEqual(convert(31), 'Thirty-one dollars');
	strictEqual(convert(50), 'Fifty dollars');
	strictEqual(convert(55), 'Fifty-five dollars');
	strictEqual(convert(86), 'Eighty-six dollars');
	strictEqual(convert(99), 'Ninety-nine dollars');
	strictEqual(convert(100), 'One hundred dollars');
	strictEqual(convert(101), 'One hundred one dollars');
	strictEqual(convert(102), 'One hundred two dollars');
	strictEqual(convert(200), 'Two hundred dollars');
	strictEqual(convert(201), 'Two hundred one dollars');
	strictEqual(convert(830), 'Eight hundred thirty dollars');
	strictEqual(convert(839), 'Eight hundred thirty-nine dollars');
	strictEqual(convert(999), 'Nine hundred ninety-nine dollars');
	strictEqual(convert(1000), 'One thousand dollars');
	strictEqual(convert(1001), 'One thousand one dollars');
	strictEqual(convert(1010), 'One thousand ten dollars');
	strictEqual(convert(1100), 'One thousand one hundred dollars');
	strictEqual(convert(1101), 'One thousand one hundred one dollars');
	strictEqual(convert(2000), 'Two thousand dollars');
	strictEqual(convert(2438), 'Two thousand four hundred thirty-eight dollars');
	strictEqual(convert(2413), 'Two thousand four hundred thirteen dollars');
	strictEqual(convert(9999), 'Nine thousand nine hundred ninety-nine dollars');	
});

test('decimal tests', function () {
	strictEqual(convert(1.11), 'One and 11/100 dollars');
	strictEqual(convert(1.10), 'One and 10/100 dollars');
	strictEqual(convert(1.01), 'One and 01/100 dollars');
	strictEqual(convert(10.02), 'Ten and 02/100 dollars');
	strictEqual(convert(0.02), 'Zero and 02/100 dollars');
	strictEqual(convert(0.00), 'Zero dollars');
	strictEqual(convert(1.00), 'One dollar');
	strictEqual(convert(1.0), 'One dollar');
	strictEqual(convert(1.), 'One dollar');
	strictEqual(convert('1.10'), 'One and 10/100 dollars');
	strictEqual(convert(2523.04), 'Two thousand five hundred twenty-three and 04/100 dollars'); // Listed in problem description
	strictEqual(convert(1101.1), 'One thousand one hundred one and 10/100 dollars');
});

test('error-inducing tests', function () {
	strictEqual(convert(10000), 'Amount too large (valid range: 0.01-9999.99 and 0)');
	strictEqual(convert(-1), 'Amount too small (valid range: 0.01-9999.99 and 0)');
	strictEqual(convert(9999.999), 'Amount too large (valid range: 0.01-9999.99 and 0)');
	strictEqual(convert(0.001), 'Amount too small (valid range: 0.01-9999.99 and 0)');
	strictEqual(convert('hey'), 'Amount not a number');
	strictEqual(convert(1.234), 'Amount has too many decimal places');
	strictEqual(convert(0.101), 'Amount has too many decimal places');
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

test('rounding tests', function () {
	strictEqual(roundNumber(1.22, 2), 1.22);
	strictEqual(roundNumber(1.009, 2), 1.01);
	strictEqual(roundNumber(.00, 2), 0.00);
	strictEqual(roundNumber(.01, 2), 0.01);
	strictEqual(roundNumber(.1, 2), 0.10);
	strictEqual(roundNumber(1, 2), 1.00);
	
});