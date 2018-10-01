const winston = require('winston');

const log = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});


module.exports = log;
