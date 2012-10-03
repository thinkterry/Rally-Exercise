function convert(amount) {
	var ones = '',
		tens = '';
	
	if (amount < 20) {
		ones = getSimpleCase(amount);
	} else if (amount === 20) {
		tens = 'twenty';
	} else if (amount < 30) {
		tens = 'twenty';
		tens += '-';
		ones = getOnes(amount - 20);
	} else if (amount === 30) {
		tens = 'thirty';
	} else if (amount > 30) {
		tens = 'thirty'
		tens += '-';
		ones = getOnes(amount - 30);
	}
	
	var retval = tens + ones;
	
	// Capitalize first letter
	// Modified from: http://stackoverflow.com/a/4878800
	retval = retval.charAt(0).toUpperCase() + retval.substr(1);
	
	return retval;
}

// Only call with numbers 0-19
function getSimpleCase(amount) {
	if (amount < 10) {
		return getOnes(amount);
	} else if (amount < 20) {
		return getTeens(amount);
	}
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