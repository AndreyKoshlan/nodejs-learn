function toBigInt(value, exp = 0) {
	let stringValue = value.toString();
	let signIndex = stringValue.indexOf('.');
	let newSignIndex = signIndex < 0 ? stringValue.length + exp : signIndex + exp;
	stringValue = stringValue.replace('.', '');
	if (newSignIndex > stringValue.length)
		return BigInt( stringValue + '0'.repeat(newSignIndex - stringValue.length) );
	return BigInt( stringValue.slice(0, newSignIndex) );
}

function bigIntToString(value, exp) {
	function deleteTrailingZeros(strValue) {
		let match = strValue.match(/(.[0-9]*)0+$/);
		if (!match)
			return strValue;
		let zeroMatch = strValue.match(/0+$/);
		strValue = strValue.slice(0, zeroMatch.index);
		if (strValue.slice(-1) == '.')
			return strValue.slice(0, -1);
		return strValue;
	}

	let stringValue = value.toString();
	let signIndex = stringValue.indexOf('.');
	signIndex = signIndex < 0 ? stringValue.length : signIndex;
	if (exp <= 0)
		return stringValue;
	if (exp >= signIndex)
		return deleteTrailingZeros( '0.' + '0'.repeat(exp - stringValue.length) + stringValue );
	let newPointPos = stringValue.length - exp;
	return deleteTrailingZeros(
		stringValue.slice(0, newPointPos) + '.' + stringValue.slice(newPointPos)
	);
}

function sum(firstNum, secondNum, exp = 64) {
	result = toBigInt(firstNum, exp) + toBigInt(secondNum, exp);
	return bigIntToString(result, exp);
}

function sub(firstNum, secondNum, exp = 64) {
	result = toBigInt(firstNum, exp) - toBigInt(secondNum, exp);
	return bigIntToString(result, exp);
}

function multiply(firstNum, secondNum, exp = 64) {
	result = toBigInt(firstNum, exp) * toBigInt(secondNum, exp);
	return bigIntToString(result, exp * 2);
}

function divide(firstNum, secondNum, exp = 64, precision = 32) {
	result = toBigInt(firstNum, exp) * (
		toBigInt(1, exp + precision) / toBigInt(secondNum, exp)
	);
	return bigIntToString(result, exp + precision);
}

module.exports = {sum, sub, multiply, divide};