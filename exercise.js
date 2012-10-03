function convert(amount) {
	var ones = '',
		tens = '';
	
	if (amount > 19) {
		tens = 'Twenty';
	}
	
	if (amount < 20) {
		ones = getOnes(amount);
		
		// Capitalize first letter
		// Modified from: http://stackoverflow.com/a/4878800
		ones = ones.charAt(0).toUpperCase() + ones.substr(1);
	} else if (amount > 20) {
		tens += '-';
		ones = getOnes(amount - 20);
	}
	
	return tens + ones;
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