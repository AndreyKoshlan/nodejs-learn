export default () => ({
  port: parseInt(process.env.PORT, 10) || 80,
  storage_path: process.env.STORAGE_PATH ?? '../storage/',
});
