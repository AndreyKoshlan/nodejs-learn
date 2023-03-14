const pool = require('../database');
const format = require("pg-format");

module.exports.insert = async function(table, keys, values) {
    return pool.query(
        format('INSERT INTO %I (%I) VALUES (%L) RETURNING *', table, keys, values)
    );
}

module.exports.updateSelect = async function(table, keys, values, keyCompare, valueCompare) {
    return pool.query(
        format(
            'UPDATE %I SET (%I) = (%L) WHERE %I=%L RETURNING *',
            table, keys, values, keyCompare, valueCompare
        )
    );
}

module.exports.deleteSelect = async function(table, keyCompare, valueCompare) {
    return pool.query(
        format(
            'DELETE FROM %I WHERE %I=%L',
            table, keyCompare, valueCompare
        )
    );
}

module.exports.select = async function(table, key, value) {
    return pool.query(
        format('SELECT * FROM %I WHERE %I=%L', table, key, value)
    );
}

module.exports.list = async function(table, page, entries) {
    return pool.query(
        format(
            'SELECT * FROM %I LIMIT %L OFFSET %L',
            table, entries, (page - 1) * entries
        )
    );
}