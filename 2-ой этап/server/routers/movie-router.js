const movieController = require('../controllers/movie-controller');

module.exports = [
    {
        pathname: '/movies/list',
        method: 'GET',
        func: movieController.list
    },
    {
        pathname: '/movies',
        method: 'GET',
        func: movieController.get
    },
    {
        pathname: '/movies',
        method: 'POST',
        func: movieController.create
    },
    {
        pathname: '/movies',
        method: 'PATCH',
        func: movieController.patch
    },
    {
        pathname: '/movies',
        method: 'DELETE',
        func: movieController.delete
    }
];