const url = require("url");

const genreRepository = require('../repositories/genre-repository');
const movieRepository = require('../repositories/movie-repository');

function getGenreNotSpecifiedError(genre) {
    if (typeof genre === 'undefined')
        return { status: 400, data: 'genre not specified' };
}

async function getMovieExistenceError(movie_id) {
    if (typeof movie_id === 'undefined')
        return { status: 400, data: 'movie not specified' };
    let result = await movieRepository.get(movie_id);
    if (!result?.rows?.length)
        return { status: 400, data: 'movie not found' };
}

async function getGenreExistenceError(genre) {
    if (typeof genre === 'undefined')
        return { status: 400, data: 'genre not specified' };
    let result = await genreRepository.getMovieByGenre(genre, 1, 1);
    if (!result?.rows?.length)
        return { status: 400, data: 'genre not found' };
}

module.exports.list = async function(req, res) {
    try {
        let result = await genreRepository.list();
        return { data: result.rows };
    } catch (error) {
        console.log(error);
        return { status: 400 };
    }
}

module.exports.getGenreByMovie = async function(req, res) {
    try {
        let query = url.parse(req.url, true).query;
        let page = query.page ?? 1;
        let entries = query.entries ?? 10;
        if (!Object.hasOwn(query,'id'))
            return { status: 400, data: 'movie not specified' };
        let result = await genreRepository.getGenreByMovie(query.id, page, entries);
        if (!result?.rows?.length)
            return { status: 400, data: 'genres not found' };
        return { data: result.rows };
    } catch (error) {
        console.log(error);
        return { status: 400 };
    }
}

module.exports.getMovieByGenre = async function(req, res) {
    try {
        let query = url.parse(req.url, true).query;
        let page = query.page ?? 1;
        let entries = query.entries ?? 10;
        if (!Object.hasOwn(query,'genre'))
            return { status: 400, data: 'genre not specified' };
        let result = await genreRepository.getMovieByGenre(query.genre, page, entries);
        if (!result?.rows?.length)
            return { status: 400, data: 'movie not found' };
        return { data: result.rows };
    } catch (error) {
        console.log(error);
        return { status: 400 };
    }
}

module.exports.create = async function(req, res) {
    try {
        req.body = JSON.parse(req.body);

        let error =
            await getMovieExistenceError(req.body.id) ??
            getGenreNotSpecifiedError(req.body.genre);
        if (error)
            return error;

        let result = await genreRepository.create(req.body.genre, req.body.id);
        return { data: result.rows };
    } catch (error) {
        console.log(error);
        return { status: 400 };
    }
}

module.exports.delete = async function(req, res) {
    try {
        req.body = JSON.parse(req.body);

        let error = await getGenreExistenceError(req.body.genre);
        if (error)
            return error;

        let result = await genreRepository.delete(req.body.genre);
        return { data: result.rows };
    } catch (error) {
        console.log(error);
        return { status: 400 };
    }
}