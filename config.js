module.exports = {
  tmi: {
    options: {
      debug: false,
    },
    connection: {
      reconnect: true,
    },
    identity: {
      username: '', // change me!
      password: '',
    },
    channels: [''], // change me!
  },
  logfile: './casparcg_log_file', // change me!
};
