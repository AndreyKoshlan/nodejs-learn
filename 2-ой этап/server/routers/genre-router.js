const genreController = require('../controllers/genre-controller');

module.exports = [
    {
        pathname: '/genres/list',
        method: 'GET',
        func: genreController.list
    },
    {
        pathname: '/genres/byMovie',
        method: 'GET',
        func: genreController.getGenreByMovie
    },
    {
        pathname: '/genres/byGenre',
        method: 'GET',
        func: genreController.getMovieByGenre
    },
    {
        pathname: '/genres',
        method: 'POST',
        func: genreController.create
    },
    {
        pathname: '/genres',
        method: 'PATCH',
        func: genreController.patch
    },
    {
        pathname: '/genres',
        method: 'DELETE',
        func: genreController.delete
    }
];