module.exports.toCapitalizedCase = function(str) {
	return str
		.toLowerCase()
		.split(' ')
		.reduce((result, word) => 
			result + word.slice(0, 1).toUpperCase() + word.slice(1) + ' '
		, '');
}

module.exports.capitalizeFirstWord = function(str) {
	str = str.toLowerCase()
	let wordIndex = str.match(/[a-zA-Z]/)?.index;
	if (typeof wordIndex === 'undefined')
		return str;
	return str.slice(0, wordIndex) +
		str[wordIndex].toUpperCase() + 
		str.slice(1+wordIndex);
}

module.exports.formatSpaces = function(str) {
	return str
		.trim()
		.split('')
		.reduce((result, addChar) => {
			lastChar = result.slice(-1);
			if (['.', ',', '?', '!'].includes(lastChar) && addChar !== ' ')
				return result + ' ' + addChar;
			if (lastChar === ' ' && ['.', ',', '?', '!'].includes(addChar))
				return result.slice(0, -1) + addChar;
			if (lastChar === ' ' && addChar === ' ')
				return result;
			return result + addChar;
		});
}

module.exports.getWordCount = function(str) {
	return str
		.split(' ')
		.filter((word) => (word.length > 0))
		.length
}

module.exports.getUniqueWords = function(str) {
	let map = new Map();
	let words = str
		.toLowerCase()
		.split(' ')
		.map((word) => word.replace(/\.|,|!|\?/g, ''))
		.filter((word) => (word.length > 0));
	words.forEach((word) => {
		if (map.has(word))
			map.set( word, map.get(word) + 1 )
		else
			map.set( word, 1 )
	});
	return map;
}