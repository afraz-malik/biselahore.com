module.exports = {
  apps: [
    {
      name: 'biselahore.com',
      script: 'npm',
      args: 'start',
      instances: '1',
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
