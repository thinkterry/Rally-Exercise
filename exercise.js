/* ------------
 * -Exercise 1-
 * ------------
 * Write some code that will accept an amount and convert it to the
 * appropriate string representation.
 * Example:
 * Convert 2523.04
 * to "Two thousand five hundred twenty-three and 04/100 dollars"
 */

function convert(amount) {
	var valid = isValid(amount);
	if (!valid[0]) {
		return valid[1];
	}
	
	// ---- Variable declarations ----------------------------------------------
	
	amount = Number(amount); // Allow e.g. '1.10' (with quotes) to be passed in
	var wholeAmount = Math.floor(amount); // The 1234 part of 1234.56
	var formattedDecimal = getFormattedDecimal(amount); // The 56 part of 1234.56, but formatted as ' and 56/100'
	
	var dollars = ' dollars';
	if (amount === 1) {
		dollars = ' dollar'
	}
	
	// Break the amount into an array of its digits for easier access,
	// e.g. 1234 into [1, 2, 3, 4]. Access the array with meaningful index names.
	var digits = getDigits(wholeAmount);
	var ones = digits.length - 1,
		tens = digits.length - 2,
		hundreds = digits.length - 3,
		thousands = digits.length - 4;
	
	// Longform representations of the amount, one for each digit,
	// e.g. ['one thousand ', 'two hundred ', 'thirty-', 'four'].
	var longforms = ['', '', '', ''];
	
	// ---- Actual computations ------------------------------------------------
	
	// Ones
	if (digits.length >= 1) {
		if (wholeAmount === 0) {
			longforms[ones] = 'zero';
		}
		
		if (digits[ones] !== 0) {
			longforms[ones] = getOnes(digits[ones]);
		}
	}
	
	// Tens
	// (messy because of teens and dashes between tens and ones, etc.)
	if (digits.length >= 2) {
		if (digits[tens] === 0 && digits[ones] === 0) { // Last two digits are 00
			// no-op
		} else if (digits[tens] === 0) { // Last two digits are <= 9
			longforms[tens] += ' ';
		} else if (digits[tens] === 1) { // Last two digits are in the teens
			// Easier to pass 11 to getTeens() than to pass [1, 1]
			amountOfLastTwoDigits = (digits[tens] * 10) + digits[ones];
			longforms[tens] = getTeens(amountOfLastTwoDigits);
			
			longforms[ones] = ''; // 'eleven' instead of 'eleven-one'
		} else { // Last two digits are >= 20
			longforms[tens] = getTens(digits[tens]);
		
			if (digits[ones] !== 0) {
				// Add a dash only if the ones digit exists, to avoid e.g. 20
				// becoming 'twenty-' (with a dangling dash).
				longforms[tens] += '-';
			}
		}
	}
	
	// Hundreds
	if (digits.length >= 3) {
		if (digits[hundreds] !== 0) {
			longforms[hundreds] += getOnes(digits[hundreds]);
			longforms[hundreds] += " hundred";
			
			if (digits[tens] !== 0) {
				longforms[hundreds] += ' ';
			}
		}
	}
	
	// Thousands
	if (digits.length >= 4) {
		longforms[thousands] += getOnes(digits[thousands]);
		longforms[thousands] += " thousand";
		
		if (digits[hundreds] !== 0 || digits[tens] !== 0) {
			longforms[thousands] += ' ';
		}
	}
	
	return capitalize(longforms.join('') + formattedDecimal + dollars);
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

function getFormattedDecimal(amount) {
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

function capitalize(string) {
	// Modified from: http://stackoverflow.com/a/4878800
	return string.charAt(0).toUpperCase() + string.substr(1);
}