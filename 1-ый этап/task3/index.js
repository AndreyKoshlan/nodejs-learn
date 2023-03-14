'use strict';

const {Product, filterProducts} = require('./product');

let products = [
	new Product('oranges', 50, 150, 'produce'),
	new Product('apples', 50, 150, 'produce'),
	new Product('bananas', 50, 70, 'produce'),
	new Product('lettuce', 80, 100, 'produce'),
	new Product('milk', 60, 80, 'dairy'),
	new Product('tomatoes', 40, 200, 'produce'),
	new Product('cheese', 80, 25, 'dairy'),
	new Product('beef', 150, 60, 'meat'),
	new Product('yogurt', 120, 80, 'dairy'),
	new Product('eggs', 600, 120, 'dairy')
]

console.log(filterProducts('name-contains-le&price-<=100&quantity-=150&description-ends-uce', products));