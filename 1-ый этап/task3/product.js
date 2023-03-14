class Product {
	constructor(name, price, quantity, description) {
		this.name = name;
		this.price = price;
		this.quantity = quantity;
		this.description = description;
	}
}

function filterProducts(str, products) {
	function compare(product, filter) {
		let [fieldName, operator, value] = filter;
		if (!product.hasOwnProperty(fieldName))
			throw new ReferenceError(`${fieldName} is not defined`);
		field = product[fieldName];
		if (['=', '<', '>', '<=', '>='].includes(operator)) {
			if (operator == '=')
				operator = '==';
			if (isNaN(Number(value)))
				return false;
			return new Function(`return ${field} ${operator} ${value}`)();
		}
		switch (operator) {
			case 'contains':
				return field.includes(value);
			case 'starts':
				return field.startsWith(value);
			case 'ends':
				return field.endsWith(value);
		}
		return false;
	}

	function applyFilter(products, filter) {
		let result = [];
		products.forEach(product => {
			if (compare(product, filter))
				result.push(product)
		});
		return result;
	}

	let conditions = str.split('&');
	conditions.forEach(condition => {
		let match = condition.match(/[a-zA-Z0-9]+|<=|>=|=|<|>/g);
		products = applyFilter(products, match);
	});
	return products;
}

module.exports = {Product, filterProducts};