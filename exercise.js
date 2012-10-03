function convert(amount) {
	var validWithMessage = isValid(amount);
	if (!validWithMessage[0]) {
		return validWithMessage[1];
	}
	
	amount = Number(amount); // Allow e.g. '1.10' (with quotes) to be passed in
	var wholeAmount = Math.floor(amount);
	var digits = getDigits(wholeAmount);
	var decimal = getDecimalAsString(amount);
	var ones = '',
		tens = '',
		hundreds = '',
		thousands = '';
	
	var onesIndex = digits.length - 1,
		tensIndex = digits.length - 2,
		hundredsIndex = digits.length - 3,
		thousandsIndex = digits.length - 4;
	
	var dollars = ' dollars';
	if (amount === 1) {
		dollars = ' dollar'
	}
	
	// When referencing digits[], count from the right, not the left,
	// because digits[] grows from the left.
	
	// Ones
	if (digits.length >= 1) {
		if (wholeAmount === 0) {
			ones = 'zero';
		}
		
		if (digits[onesIndex] !== 0) {
			ones = getOnes(digits[onesIndex]);
		}
	}
	
	// Tens (messy because of teens and 20, 30, etc.)
	if (digits.length >= 2) {
		if (digits[tensIndex] === 1) { // Last two digits are < 20
			ones = ''; // 'eleven' instead of 'eleven-one'
			
			// Easier to pass 11 to getTeens() than to pass [1, 1]
			amountOfLastTwoDigits = (digits[tensIndex] * 10) + digits[onesIndex];
			
			tens = getTeens(amountOfLastTwoDigits);
		} else { // Last two digits are > 20
			tens = getTens(digits[tensIndex]);
		
			if (digits[onesIndex] !== 0) { // Not 20, 30, 40...
				if (digits[tensIndex] !== 0) {
					tens += '-';
				} else {
					tens += ' ';
				}
			}
		}
	}
	
	// Hundreds
	if (digits.length >= 3) {
		if (digits[hundredsIndex] !== 0) {
			hundreds += getOnes(digits[hundredsIndex]);
			hundreds += " hundred";
			
			if (digits[tensIndex] !== 0) {
				hundreds += ' ';
			}
		}
	}
	
	// Thousands
	if (digits.length >= 4) {
		thousands += getOnes(digits[thousandsIndex]);
		thousands += " thousand";
		
		if (digits[hundredsIndex] !== 0 || digits[tensIndex] !== 0) {
			thousands += ' ';
		}
	}
	
	return format(thousands + hundreds + tens + ones + decimal + dollars);
}

function getDigits(integer) {
	var amountAsString = integer.toString();
	var amountAsStringArray = amountAsString.split('');
	
	var amountAsIntArray = [];
	for (var i = 0; i < amountAsStringArray.length; i++) {
		amountAsIntArray[i] = parseInt(amountAsStringArray[i], 10); // Base 10
	}
	
	return amountAsIntArray;
}

function getDecimalAsString(amount) {
	var retval = roundNumber(amount - Math.floor(amount), 2);
	if (retval !== 0) { // Truthy even with differing sig figs (e.g. 0.0 vs 0.00)
		var decimalAsInt = retval * 100;
		var decimalAsString = decimalAsInt.toString();
		if (decimalAsString.length === 1) {
			decimalAsString = '0' + decimalAsString; // Padded zero
		}
		retval = ' and ' + decimalAsString + '/100';
	} else {
		retval = '';
	}
	return retval;
}

// Modified from: http://stackoverflow.com/a/478445
function roundNumber(number, digits) {
	var multiple = Math.pow(10, digits);
	return Math.round(number * multiple) / multiple;
}

function format(string) {
	// Capitalize first letter. Modified from: http://stackoverflow.com/a/4878800
	return string.charAt(0).toUpperCase() + string.substr(1);
}

function getOnes(ones) {
	switch (ones) {
		case 1:
			return 'one';
		case 2:
			return 'two';
		case 3:
			return 'three';
		case 4:
			return 'four';
		case 5:
			return 'five';
		case 6:
			return 'six';
		case 7:
			return 'seven';
		case 8:
			return 'eight';
		case 9:
			return 'nine';
		default:
			break;
	}
}

function getTeens(teens) {
	switch (teens) {
		case 10:
			return 'ten';
		case 11:
			return 'eleven';
		case 12:
			return 'twelve';
		case 13:
			return 'thirteen';
		case 14:
			return 'fourteen';
		case 15:
			return 'fifteen';
		case 16:
			return 'sixteen';
		case 17:
			return 'seventeen';
		case 18:
			return 'eighteen';
		case 19:
			return 'nineteen';
		default:
			break;
	}
}

function getTens(tens) {
	switch (tens) {
		case 0:
			return '';
		case 1:
			break; // Handled in getTeens()
		case 2:
			return 'twenty';
		case 3:
			return 'thirty';
		case 4:
			return 'forty';
		case 5:
			return 'fifty';
		case 6:
			return 'sixty';
		case 7:
			return 'seventy';
		case 8:
			return 'eighty';
		case 9:
			return 'ninety';
		default:
			break;
	}
}

function isValid(amount) {
	if (isNaN(amount)) {
		return [false, 'Amount not a number'];
	}
	
	if (amount > 9999.99) {
		return [false, 'Amount too large (valid range: 0.01-9999.99 and 0)'];
	}
	if (amount < 0.01 && amount !== 0) {
		return [false, 'Amount too small (valid range: 0.01-9999.99 and 0)'];
	}
	
	// Check for at most two decimal places
	var decimalSplit = amount.toString().split('.');
	if (decimalSplit.length === 2 && decimalSplit[1].length > 2) {
		return [false, 'Amount has too many decimal places'];
	}
	
	return [true, 'valid'];
}