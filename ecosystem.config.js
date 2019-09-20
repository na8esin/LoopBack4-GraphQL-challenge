module.exports = {
  apps : [{
    name: 'API',
    script: 'index.js',
    error_file: 'err.log',
    out_file: 'out.log',
    log_file: 'combined.log',
    time: true,

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
