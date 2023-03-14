exports.HOST = process.env.HOST ?? '127.0.0.1';
exports.PORT = process.env.PORT ?? 80;
exports.DB_HOST = process.env.DB_HOST ?? '127.0.0.1';
exports.DB_PORT = process.env.DB_PORT ?? 5432;
exports.DB_USER = process.env.DB_USER ?? 'postgres';
exports.DB_PASSWORD = process.env.DB_PASSWORD ?? 'root';
exports.DB_DATABASE = process.env.DB_DATABASE ?? 'movies';