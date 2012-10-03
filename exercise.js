function convert(amount) {
	var ones = '',
		tens = '',
		hundreds = '',
		thousands = '';
	var digits = getDigits(Math.floor(amount))
	
	// When referencing digits[], count from the right, not the left,
	// because digits[] grows from the left.
	
	if (digits.length >= 1) {
		if (amount === 0) {
			return format('zero');
		}
		
		if (digits[digits.length - 1] !== 0) {
			ones = getOnes(digits[digits.length - 1]);
		}
	}
	
	if (digits.length >= 2) {
		if (digits[digits.length - 2] === 1) { // Last two digits < 20
			// Calculate temporary amount for last two digits
			amountOfLastTwoDigits = (digits[digits.length - 2] * 10) + digits[digits.length - 1];
			ones = '';
			tens = getTeens(amountOfLastTwoDigits);
		} else {
			tens = getTens(digits[digits.length - 2]);
		
			if (digits[digits.length - 1] !== 0) { // Not 20, 30, 40...
				if (digits[digits.length - 2] !== 0) {
					tens += '-';
				} else {
					tens += ' ';
				}
				ones = getOnes(digits[digits.length - 1]);
			}
		}
	}
	
	if (digits.length >= 3) {
		if (digits[digits.length - 3] !== 0) {
			hundreds += getOnes(digits[digits.length - 3]);
			hundreds += ' ';
			hundreds += "hundred";
			
			if (digits[digits.length - 2] !== 0) {
				hundreds += ' ';
			}
		}
	}
	
	if (digits.length >= 4) {
		thousands += getOnes(digits[digits.length - 4]);
		thousands += ' ';
		thousands += "thousand";
		
		if (digits[digits.length - 3] !== 0 || digits[digits.length - 2] !== 0) {
			thousands += ' ';
		}
	}
	
	return format(thousands + hundreds + tens + ones);
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

function format(string) {
	// Capitalize first letter
	// Modified from: http://stackoverflow.com/a/4878800
	return string.charAt(0).toUpperCase() + string.substr(1);
}

function getOnes(ones) {
	switch (ones) {
		case 0:
			return '';
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
			break;
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