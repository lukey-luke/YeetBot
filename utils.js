function getMoveProbability(message) {
    const MAX_MOVE_PROBABILITY;
    let move_probability = 0;
    message.split(' ').forEach(word => {
        if(word.includes('yeet') && move_probability < MAX_MOVE_PROBABILITY) {
            move_probability += 0.1
            if(move_probability > MAX_MOVE_PROBABILITY) {
                move_probability = MAX_MOVE_PROBABILITY;
            }
        }
    })
    return move_probability
}

function movePabs(){
  console.log('test');
}

function recordUserLoginTime(username){
  window.setInterval(() => {
    if (inChannel(username)) {
      // update their logged in time += 1 minute
    }
  }, 60 * 1000)
}

function moveUserBasedOnLoginTime(username){
  window.setInterval(() => {
    if (isLoggedInUser(username)) {
      const logged_in_timer = getLoggedInTime(username)
      if (logged_in_timer > PABS_CHECK_TIME) {
        movePabs()
        resetLoggedInTime(username);
      }
    }
  }, 5 * 60 * 1000)
}
