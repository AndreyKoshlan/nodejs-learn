const _ = require("lodash");
const format = require("pg-format");

const baseRepository = require('./base-repository')
const pool = require("../database");

module.exports.list = async function() {
    return pool.query(
        format(
            'SELECT DISTINCT * FROM movie_genre'
        )
    );
}

module.exports.getGenreByMovie = async function(movie_id, page, entries) {
    return pool.query(
        format(
            'SELECT * ' +
            'FROM movie_genre ' +
            'WHERE movie_id = %L' +
            'LIMIT %L OFFSET %L', movie_id, entries, (page - 1) * entries
        )
    );
}

module.exports.getMovieByGenre = async function(genre, page, entries) {
    return pool.query(
        format(
            'SELECT * ' +
            'FROM movie ' +
            'WHERE id IN (SELECT movie_id FROM movie_genre WHERE genre = %L)' +
            'LIMIT %L OFFSET %L', genre, entries, (page - 1) * entries
        )
    );
}

module.exports.create = async function(genre, movie) {
    return baseRepository.insert('movie_genre', ['movie_id', 'genre'], [movie, genre]);
}

module.exports.delete = async function(genre) {
    return baseRepository.deleteSelect(
        'movie_genre', 'genre', genre
    );
}