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
	strictEqual(convert(1), 'One');
	strictEqual(convert(2), 'Two');
	strictEqual(convert(9), 'Nine');
});