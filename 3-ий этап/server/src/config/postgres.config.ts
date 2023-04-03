export default () => ({
  postgres_host: process.env.POSTGRES_HOST ?? '127.0.0.1',
  postgres_port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  postgres_username: process.env.POSTGRES_USER ?? 'postgres',
  postgres_password: process.env.POSTGRES_PASSWORD ?? 'root',
  postgres_db: process.env.POSTGRES_DB ?? 'movies',
  postgres_salt: parseInt(process.env.POSTGRES_SALT, 10) || 10
});
