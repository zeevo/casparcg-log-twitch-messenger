const tmi = require('tmi.js');
const Tail = require('always-tail');
const log = require('./logger');
const { checkLogFile, getCandidate, getFileNames } = require('./utils');

class SpamSafeGuard {
  constructor(interval) {
    // interval in seconds
    this.interval = interval;
    this.lastExecute = new Date();
  }

  execute(callback) {
    if (this.ok()) {
      log.debug('Safe guard passed. Executing callback');
      this.lastExecute = new Date();
      return callback();
    }
    log.debug('Safe guard blocked execution');
    return null;
  }

  ok() {
    const now = new Date();
    const seconds = (now - this.lastExecute) / 1000;
    return seconds >= this.interval;
  }
}

class Client {
  constructor(options, logFile) {
    this.api = tmi.client(options);
    this.options = options;
    this.logFile = logFile;
    this.safeGuard = new SpamSafeGuard(5);
    checkLogFile(logFile);
  }

  start() {
    this.api.connect()
      .then((data) => {
        log.info(`Connected to ${data}`);
        this.listenAndParseLogFile();
      })
      .catch((err) => {
        if (err) {
          log.error(err.toString());
        }
      });
  }

  listenAndParseLogFile() {
    const tail = new Tail(this.logFile, '\n', { interval: 1000 });
    log.info(`Tailing file ${this.logFile}`);
    tail.on('error', (err) => {
      log.error('An error occured while tailing the log file');
      log.error(err);
    });
    tail.on('line', (line) => {
      log.debug(`Saw line -- ${line}`);
      const candidate = getCandidate(line);
      if (candidate) {
        log.debug('Found transition event');
        const filenames = getFileNames(candidate);
        const prev = filenames[0];
        let next = filenames[1];
        log.info(`Found filenames ${prev}, ${next}`);
        if (next.toLowerCase().includes('brb')) {
          this.playCommercial();
        } else {
          next = next.replace(/\.[^/.]+$/, '');
          if (next !== 'empty') {
            this.updateTitle(next);
          }
        }
      }
    });
    tail.watch();
  }

  playCommercial() {
    this.send('/commercial', () => {
      log.info('Playing commercial');
    });
  }

  updateTitle(title) {
    this.send(`!title ${title}`, () => {
      log.info(`Updating title to ${title}`);
    });
  }

  send(message, cb) {
    this.safeGuard.execute(() => {
      this.options.channels.forEach((channel) => {
        if (cb) {
          cb();
        }
        log.info(`Sending ${message} to channel ${channel}`);
        this.api.say(channel, message);
      });
    });
  }
}

module.exports = Client;
