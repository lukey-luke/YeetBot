function getMoveProbability(message) {
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
