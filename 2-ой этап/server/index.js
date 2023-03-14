const dotenv = require('dotenv');
const config = require('./config');
const Server = require('./server');
const movieRouter = require('./routers/movie-router');
const genreRouter = require('./routers/genre-router');

dotenv.config();

const server = new Server();
server.start(config.PORT, config.HOST, () => {
    console.log('Server is running on %s:%s', config.HOST, config.PORT);
});

server.appendRouter(movieRouter);
server.appendRouter(genreRouter);