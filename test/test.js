/* eslint-env node, mocha */
/* eslint func-names: 0 */
/* eslint prefer-arrow-callback: 0 */
const assert = require('assert');
const { getCandidate, getFileName, getFileNames, checkLogFile } = require('../lib/utils');
const testlines = require('./testlines');

describe('getCandidate', function () {
  it('Should return the transition line', function () {
    assert.strictEqual(
      getCandidate(testlines.VID_TO_EMPTY),
      '[ffmpeg[foo 123_bar-prev.mp4|1280x720i120.00|0/22452]=>empty]',
    );
  });

  it('Should return the transition line', function () {
    assert.strictEqual(
      getCandidate(testlines.EMPTY_TO_VID),
      '[empty=>ffmpeg[foo 123_bar-next.mp4|1280x720i120.00|0/22452]',
    );
  });

  it('Should return the transition line', function () {
    assert.strictEqual(
      getCandidate(testlines.VID_TO_VID),
      '[ffmpeg[foo 123_bar-prev.mp4|1280x720i120.00|0/22452]=>[foo 123_bar-next.mp4|1280x720i120.00|0/22452]',
    );
  });

  it('Should return false', function () {
    assert.ok(!getCandidate(testlines.NOT_A_TRANSITION_1));
  });
  it('Should return false', function () {
    assert.ok(!getCandidate(testlines.NOT_A_TRANSITION_2));
  });
  it('Should return false', function () {
    assert.ok(!getCandidate(testlines.NOT_A_TRANSITION_3));
  });
  it('Should return false', function () {
    assert.ok(!getCandidate(testlines.NOT_A_TRANSITION_4));
  });
  it('Should return false', function () {
    assert.ok(!getCandidate(testlines.NOT_A_TRANSITION_5));
  });
  it('Should return false', function () {
    assert.ok(!getCandidate(testlines.NOT_A_TRANSITION_6));
  });
  it('Should return false', function () {
    assert.ok(!getCandidate(testlines.EMPTY_LINE));
  });
  it('Should return false', function () {
    assert.ok(!getCandidate(testlines.WHITESPACE));
  });
});

describe('getFileNames', function () {
  it('should return an array of two filenames', function () {
    assert.deepEqual(
      getFileNames('[ffmpeg[foo 123_bar-prev.mp4|1280x720i120.00|0/22452]=>empty]'),
      ['foo 123_bar-prev.mp4', 'empty'],
    );
  });
});
