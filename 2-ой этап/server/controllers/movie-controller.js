const url = require("url");

const movieRepository = require('../repositories/movie-repository');

async function getMovieExistenceError(id) {
    if (typeof id === 'undefined')
        return { status: 400, data: 'id not specified' };
    let result = await movieRepository.get(id);
    if (!result?.rows?.length)
        return { status: 400, data: 'movie not found' };
}

module.exports.list = async function(req, res) {
    try {
        let query = url.parse(req.url, true).query;
        let page = query.page ?? 1;
        let entries = query.entries ?? 10;
        let result = await movieRepository.list(page, entries);
        return { data: result.rows };
    } catch (error) {
        console.log(error);
        return { status: 400 };
    }
}

module.exports.get = async function(req, res) {
    try {
        let query = url.parse(req.url, true).query;
        if (!Object.hasOwn(query,'id'))
            return { status: 400, data: 'id not specified' };
        let result = await movieRepository.get(query.id);
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
        let result = await movieRepository.create(req.body);
        return { data: result.rows };
    } catch (error) {
        console.log(error);
        return { status: 400 };
    }
}

module.exports.patch = async function(req, res) {
    try {
        req.body = JSON.parse(req.body);

        let id = req.body.id;
        let error = await getMovieExistenceError(id);
        if (error)
            return error;

        let result = await movieRepository.patch(id, req.body);
        return { data: result.rows };
    } catch (error) {
        console.log(error);
        return { status: 400 };
    }
}

module.exports.delete = async function(req, res) {
    try {
        req.body = JSON.parse(req.body);

        let id = req.body.id;
        let error = await getMovieExistenceError(id);
        if (error)
            return error;

        let result = await movieRepository.delete(id);
        return { data: result.rows };
    } catch (error) {
        console.log(error);
        return { status: 400 };
    }
}