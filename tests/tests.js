/*
// copy/paste
test(' test', function () {
	strictEqual(, );
});
*/

test('hello test', function () {
	ok(true === true, 'true is true');
});

test('simple tests', function () {
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
});

test('getDigits tests', function () {
	deepEqual(getDigits(0), [0]);
	deepEqual(getDigits(1), [1]);
	deepEqual(getDigits(10), [1, 0]);
	deepEqual(getDigits(100), [1, 0, 0]);
	deepEqual(getDigits(111), [1, 1, 1]);
	deepEqual(getDigits(1000), [1, 0, 0, 0]);
	//deepEqual(getDigits(1.50), [1, '.', 5, 0]); // Illegal
});