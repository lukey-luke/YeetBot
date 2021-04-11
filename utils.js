module.exports = {
  PABS_CHECK_TIME: 1000 * 60 * 60 * 17 + 43 * 60 * 1000, // 17 hours, 43 min
  MAX_MOVE_PROBABILITY: 0.8,
  
  getYeetCount: function(s){
    let string_to_search = s.toLowerCase();
    return (string_to_search.match(/yeet/g) || []).length;
  },
  
  getMoveProbability: function(message) {
      let move_probability = 0;
      message.split(' ').forEach(word => {
          if(word.includes('yeet') && move_probability < this.MAX_MOVE_PROBABILITY) {
              move_probability += 0.1
              if(move_probability > this.MAX_MOVE_PROBABILITY) {
                  move_probability = this.MAX_MOVE_PROBABILITY;
              }
          }
      })
      return move_probability
  },
  
  // recordUserLoginTime: function(username){
  //   window.setInterval(() => {
  //     if (inChannel(username)) {
  //       // update their logged in time += 1 minute
  //     }
  //   }, 60 * 1000)
  // },
  
  // moveUserBasedOnLoginTime: function(username){
  //   window.setInterval(() => {
  //     if (isLoggedInUser(username)) {
  //       const logged_in_timer = getLoggedInTime(username)
  //       if (logged_in_timer > PABS_CHECK_TIME) {
  //         movePabs()
  //         resetLoggedInTime(username);
  //       }
  //     }
  //   }, 5 * 60 * 1000)
  // },

};