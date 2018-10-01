const options = require('../config');
const Client = require('./client');
const log = require('./logger.js');

log.info(`Config: Identity: ${options.tmi.identity.username}`);
log.info(`Config: Channels: ${options.tmi.channels}`);
log.info(`Config: Logfile: ${options.logfile}`);

const client = new Client(options.tmi, options.logfile);
client.start();
