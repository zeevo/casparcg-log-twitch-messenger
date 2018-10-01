module.exports = {
  EMPTY_TO_VID: '[2018-09-21 21:25:59:562] [9172]  [info]    transition[empty=>ffmpeg[foo 123_bar-next.mp4|1280x720i120.00|0/22452]] End of File.',
  VID_TO_VID: '[2018-09-21 21:25:59:562] [9172]  [info]    transition[ffmpeg[foo 123_bar-prev.mp4|1280x720i120.00|0/22452]=>ffmpeg[foo 123_bar-next.mp4|1280x720i120.00|0/22452]] End of File.',
  VID_TO_EMPTY: '[2018-09-21 21:25:59:562] [9172]  [info]    transition[ffmpeg[foo 123_bar-prev.mp4|1280x720i120.00|0/22452]=>empty] End of File.',
  NOT_A_TRANSITION_1: '[2018-09-21 21:25:59:562] [9172]  [info] ',
  NOT_A_TRANSITION_2: '[2018-09-21 21:25:59:562] [9172]  [debug]     executed command: LoadbgCommand',
  NOT_A_TRANSITION_3: '[2018-09-21 21:25:59:562] [9172]  [info]    sent message blah blah blah',
  NOT_A_TRANSITION_4: '[2018-09-21 21:25:59:562] [9172]  [info]    ffmpeg[2018-09-13 20-19-.mp4|1280x720i120.00|0/22452]',
  NOT_A_TRANSITION_5: '+------------',
  NOT_A_TRANSITION_6: '| filter buffer | default--[123213213123 21321 3213] 3139 81 hkjshdjk ahud ',
  EMPTY_LINE: '',
  WHITESPACE: '           ',
};
