const fs = require('fs');
const log = require('./logger');

function checkLogFile(filename) {
  fs.exists(filename, (exists) => {
    if (!exists) {
      throw new Error(`Targeted file for tailing "${filename}" does not exist or could not be found. Did you specify the path correctly in config.js?`);
    }
    if (fs.lstatSync(filename).isDirectory()) {
      throw new Error('You are targeting a directory. Review your config.js log file.');
    }
  });
}

function getFileName(str) {
  log.info(`Getting filename from ${str}`);
  if (str === 'empty') {
    return 'empty';
  }
  let filename = str.split('|')[0];
  if (filename.slice(-1) === ']') {
    filename = filename.substring(0, filename.length - 1);
  }
  if (filename.charAt(0) === '[') {
    filename = filename.substring(1, filename.length);
  }
  return filename;
}

function getFileNames(candidate) {
  const parsed = candidate.substring(1, candidate.length - 1).replace('ffmpeg', '');
  const split = parsed.split('=>');
  log.info(`Split filenames: ${split}`);
  return [getFileName(split[0]), getFileName(split[1])];
}

function getCandidate(line) {
  const matches = line.match(/\[(.*?)\]/g);
  if (matches && matches.length >= 4 && matches[2] === '[info]' && line.match(/transition/)) {
    if (matches.length === 5) { // video to video
      return matches.slice(3, 5).join('=>');
    }
    if (matches.length === 4 && matches[3].startsWith('[ffmpeg')) {
      matches.push('empty]');
      return matches.slice(3, 5).join('=>');
    }
    return matches[3];
  }
  return false;
}

module.exports = {
  getCandidate: getCandidate,
  getFileName: getFileName,
  getFileNames: getFileNames,
  checkLogFile: checkLogFile,
};
