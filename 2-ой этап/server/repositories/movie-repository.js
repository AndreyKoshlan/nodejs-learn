const _ = require("lodash");

const baseRepository = require('./base-repository')

const MOVIE_FIELDS = ['name', 'description', 'year', 'country',
    'director_id', 'screenplay_id', 'producer_id', 'cinematographer_id',
    'composer_id', 'artist_id', 'editor_id'];

module.exports.list = async function(page, entries) {
    return baseRepository.list('movie', page, entries);
}

module.exports.get = async function(id) {
    return baseRepository.select('movie', 'id', id);
}

module.exports.create = async function(data) {
    let fields = _.pick(data, MOVIE_FIELDS);
    return baseRepository.insert('movie', Object.keys(fields), Object.values(fields));
}

module.exports.patch = async function(id, data) {
    let fields = _.pick(data, MOVIE_FIELDS);
    return baseRepository.updateSelect(
        'movie', Object.keys(fields), Object.values(fields), 'id', id
    );
}

module.exports.delete = async function(id) {
    return baseRepository.deleteSelect(
        'movie', 'id', id
    );
}