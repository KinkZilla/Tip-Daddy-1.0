/**
 * 💸 Tip Received 1.0.4.1
 * This event is triggered every time a user tips during the session.
 */
console.log(`🔥 TIP EVENT: ${$user.username} tipped ${$tip.tokens} tokens`);

// -----------------Experimental Code-----------------------------
// ✅ Load tip menu safely
if ($settings.tip_menu === true) {
let menu = [];
try {
  menu = JSON.parse($kv.get('tipMenu') || '[]');
} catch (e) {
  menu = [];
}

// ✅ Check for exact match
if (menu.length > 0) {
  const username = $user.username;
  const matchedItem = menu.find(entry => Number(entry.price) === $tip.tokens);

  if (matchedItem) {
    // Public message for matched item
    sendMsg('tipMenuMatch', username, matchedItem.item, matchedItem.price);

    if (matchedItem.timer) {
      // 🔐 Check if a timer is already running
      if ($kv.get('panelLockedForTimer') === true) {
        addToTimerQueue(matchedItem.item, matchedItem.timer);
        sendMsg('timerQueuedPublic', username, matchedItem.item);
      } else {
        // 🟢 Start the timer immediately
        startTimerLoop(matchedItem.item, matchedItem.timer);


      }
    }
  }
 }
}
//--------------------End Experimental Code----------------------

// Post the leaderboard X amount of minutes after the last tip. Tipping more will delay
// the leaderboard longer. This will trigger 5 minutes after the last tip by default.

if ($tip.tokens >= 1) {
  $callback.cancel('sessionLead');
  $callback.create('sessionLead', 60 * SESSION_TIME_VAR, true );
  
        if (PRIZE_ON) {
         $callback.cancel('AnnounceGoalPrize');
         $callback.create('AnnouncegoalPrize', 60 * GOAL_PRIZE_TIME, true)
      }

}

// ✅ STEP 1: Update the session leaderboard 💯
updateSessionTippers($user.username, $tip.tokens);

// ✅ STEP 2: Rebuild the session leaderboard after updating 💯
const sessionLeaderboard = buildSessionLeaderboard();

// ✅ STEP 3: Find this user's new total session token count  💯
const userEntry = sessionLeaderboard.find(entry => entry.username === $user.username);
const sessionTotal = userEntry ? userEntry.tokens : 0;

// ✅ STEP 4: Update the All-Time leaderboard, but only if necessary 💯
updateAllTimeTippers($user.username, sessionTotal);


// ✅ STEP 5: Update the Goal Progress (We always want that to be live/instant.) 💯

updateGoalProgress($tip.tokens);  // Checks goalCurrent, adds the new tokens, saves that new value to goalCurrent.

let panelLocked = false;
let panelLockedForTimer = false;

try { panelLocked = $kv.get('panelLocked') === true; } catch (e) {
  console.log('Failed to get panelLocked');
}
try { panelLockedForTimer = $kv.get('panelLockedForTimer') === true; } catch (e) {
  console.log('Failed to get panelLockedForTimer');
}

if (!panelLocked && !panelLockedForTimer) {
   setDefaultPanel();
  $room.reloadPanel(); 
}


// ✅ STEP 6: Check if the crown is unlocked and if we're crowning anyone yet💯
const isTimerActive = $kv.get('panelLockedForTimer') === true;

if (!isCrownUnlocked()) {
  // First-time crowning
  if (isTimerActive) {
    handleCrownRevealDuringTimer($user.username);
  } else {
    handleCrownReveal($user.username);
  }
} else {
// ✅ STEP 7: Check if we are dethroning anyone, or if the crown is changing hands.💯


  // Crown already unlocked – transitions only
  if (isTimerActive) {
    handleCrownTransitionDuringTimer($user.username);
  } else {
    handleCrownTransition($user.username);
  }
}


// ✅ STEP 8: Check to see if they won the Goal Prize
checkGoalPrize($tip.tokens);

// ✅ STEP 9: Send User Messages

