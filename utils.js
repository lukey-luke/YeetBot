const BAD_WORDS = [
  'no cap', 'yeet', 'poggers', 'bruh', 'covid', 'pabs', 'pablo'
];

module.exports = {
  PABS_CHECK_TIME: 1000 * 60 * 60 * 17 + 43 * 60 * 1000, // 17 hours, 43 min
  MAX_MOVE_PROBABILITY: 0.8,
  
  getBadBoyCount: function(s){
    const string_to_search = s.toLowerCase();
    let bad_count = 0;
    BAD_WORDS.forEach(bad_word => {
      const regex_match = new RegExp(bad_word, 'g');
      bad_count += (string_to_search.match(regex_match) || []).length;
    });
    return bad_count;
  },
};