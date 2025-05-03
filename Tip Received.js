/**
 * 💸 Tip Received 1.0.5
 * This event is triggered every time a user tips during the session.
 */

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

if (!$kv.get('panelLocked')) {
  setDefaultPanel();
  $room.reloadPanel();
}


// ✅ STEP 6: Threshold Check, once reached, crowns the first daddy. (Runs once/session!)
handleCrownReveal($user.username); 

// ✅ STEP 7:
handleCrownTransition($user.username);

// ✅ STEP 8: Check to see if they won the Goal Prize
checkGoalPrize($tip.tokens);

// ✅ STEP 9: Send User Messages

