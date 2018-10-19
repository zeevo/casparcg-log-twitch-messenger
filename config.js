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
  logfile: './test/casparcg_test_log_file.txt', // change me!
};
