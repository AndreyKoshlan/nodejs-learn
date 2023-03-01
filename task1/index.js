const mod = require('./module');

console.log('1.1.1. Преобразование строки к нижнему регистру, но каждая первая буква большая:');
console.log( mod.toCapitalizedCase('hello world, HELLO wORLD') );
console.log();

console.log('1.1.2. Преобразование строки к нижнему регистру, но первая буква первого слова большая:');
console.log( mod.capitalizeFirstWord('hello world, HELLO wORLD') );
console.log();

console.log('1.2. Преобразование строки с целью правильной расстановки пробелов:');
console.log(mod.formatSpaces(
	' Вот пример строки,в которой     используются знаки препинания .'
));
console.log();

console.log('1.3. Кол-во слов в строке "Количество слов в строке":');
console.log(mod.getWordCount('Количество слов в строке'));
console.log();

console.log('1.4. Метод, подсчитывающий уникальные слова:');
console.log(mod.getUniqueWords(
	'Текст, в котором слово текст несколько раз встречается и слово тоже'
));