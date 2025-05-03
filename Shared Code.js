
/**
 * Tip Daddy
 * Version: 1.0.4
 * Author: kink_zilla
 *
 * Comments:
 * If you're branching Tip Daddy, you should reference the original
 * GitHub. "https://kinkzilla.github.io/Tip-Daddy-1.0/"
 * 
 * Please dont name your remix "Tip Daddy X.x.x"
 * label your remix like "Tip Daddy - Remixed" or give it your
 * own awesome title 👌👍
 */



// 🧠 Tip Daddy Constants & Runtime Lock-In

const APP_NAME = "Tip Daddy 1.0";
const APP_VERSION = "1.0.4";

$app.name = APP_NAME;
$app.version = APP_VERSION;




// The constants BELOW are evaluated ONCE when the app is started or updated.
//
// This happens when the model clicks:
//   ✅ "Start App"
//   ✅ "Restart App"
//   ✅ "Update App" (after editing settings)
//
// These constants use values from $settings and are locked in for the full session.
// If a model changes a setting mid-session, it will NOT affect these until the app is restarted.
//
// For dynamic values that can change mid-session, use $kv.get(...) or a helper function instead.
//
// Example:
//   const GOAL_LABEL = $settings.goal;         // ✅ Locked at start
//   const DEFAULT_USERNAME_MODE = $settings.use_default_username; // ✅ Locked at start
//
//   function getLivePrize() {                  // ✅ Always fresh / NOT locked at start
//     return $kv.get('goalPrize') || $settings.goal_Prize;
//   }
//           ↓  USER DEFINED CONSTANTS   ↓

/**
 * DEFAULT_NAME Boolean Value, Returns Yes or No Based on Whether Model
 * has enabled/disabled the use_default_username.
 */
const DEFAULT_NAME = $settings.use_default_username; 

/** 
 * This is the name we replace the Models Username with. Can be set by
 * the model in settings.
 */
const USER_NAME = $settings.alt_username; 

/**
 * This is the text string we're using for the goal. Eg. (Sexy strip
 * tease!)
 */
const GOAL_LABEL = $settings.goal; 

/**
 * This is how much we set the goal for, must be a number value. 
 * Eg. (3000 Tokens) Set by the model in settings.
 */
const GOAL_AMOUNT = $settings.goal_Value; 

/**
 * Boolean Value, Returns true or false Based on Whether Model
 * has enabled/disabled the goal prize.
 */
const PRIZE_ON = $settings.prize_enable;

/**
 * Text string of the goal prize. Eg. (15 minute password show + Snap)
 */
const PRIZE_LABEL = $settings.goal_Prize;

/**
 * This is the initial tip value to become the Daddy when nobody has
 * claimed the crown yet.
 */
const DADDY_PRICE = $settings.init_Tip_Value; 

/**
 * This is the Emoji that is prepended to the name of the current Daddy
 * when he chats. Default is 👑 
 */
const DADDY_EMOJI = $settings.daddy_icon;

/**
 * This is the background color of the chat when Daddy sends messages.
 * Default is green.
 */
const DADDY_COLOR = $settings.daddy_background;

/**
 * This is the time variable used for callbacks. Eg. send this notice every (X) *60 seconds.
 */
const TIME_VAR = $settings.time_value; 

/**
 * This is the text color of the tip notices
 */
const MSG_TXT = $settings.text_color; 

/**
 * This is the background color of the tip notices
 */
const MSG_BG = $settings.background_color; 

/**
 * This is the background color for the session leaderboard notice
 */
const LEADER_BG = $settings.session_leader_bg; 

/**
 * This is the text color for the session leaderboard notice
 */
const LEADER_TXT = $settings.session_leader_text; 

/**
 * This is the time variable for the session leaderboard notices.
 * SESSION_TIME_VAR * 60 seconds
 */
const SESSION_TIME_VAR = $settings.time_session_leader;

/**
 * This is the threshold that we use to decide when to start sending 
 * 'closeCall' messages.
 */
const CLOSE_CALL_THRESHOLD = 25;

/**
 * This is the suspense delay value, models can change how long the 
 * delay is for.
 */
const SUSPENSE_DELAY = $settings.susp_Delay;

/**
 * This is the text string with the hashtags for the room subject. 
 * Models will define this in settings if they choose to add hashtags.
 */
const HASH_TAGS = $settings.hash_Tags;

/**
 * This is the emoji thats added to the room subject line. Default is 🎯
 */
const SUBJ_EMOJI = $settings.goal_Emoji;

/**Whether the model wants to add Hashtags to the subject line.
 * Boolean Value, Returns Yes or No Based on Whether Model
 * has enabled/disabled $settings.use_Tags. 
 */
const USE_HASHTAGS = $settings.use_Tags



//----------------------------------------------------------------------
//                   💥    INITIALIZATION    💥
//----------------------------------------------------------------------
/**                   
*  🌩️  Called at App Start to safely initialize all session-based 
*      KV keys. Ensures goal, leaderboard, and crown systems start
*      cleanly and only once per session.
*/

function initializeAppSessionState() {
  
  let alreadyInit = false;

  try {
    alreadyInit = $kv.get('appSessionInitialized') === 'true';
  } catch (e) {
    alreadyInit = false;
  }

  if (!alreadyInit) {
    // 🎯 Goal state
    
     $kv.set('goalCurrent', 0);
     $kv.set('sessionDaddy', 'None'); // Set them as Current Daddy in panel.
     $kv.set('sessionDaddyTotal', 0)
     $kv.set('crownUnlocked', 'false');
     $kv.set('goalMsgSent', false);
     $kv.set('frameNumber', 0);
     $kv.set('panelLocked', false);
     $kv.remove('Session_Tippers');
      // Must be a string
    // 🧱 Leaderboard + crown state
     sendMsg('goalUpdateSubject'); // 🎯 Sets subject and THEN appStarted message
     setDefaultPanel();
     $room.reloadPanel();
     $kv.set('appSessionInitialized', 'true');

    // ✅ Prevent double init during reconnects
    
  } else { 
    return;}
}

//-------------------------------------------------------------------
//             🤚 🤚     GATE FUNCTIONS     ✋ ✋
//------------------------------------------------------------------

/** This gate checks if the app is initialized, prevents double init. 
 * 
 */
function isAppSessionInitialized() {
  try {
    return $kv.get('appSessionInitialized') === 'true';
  } catch (e) {
    return false;
  }
}


/**
 * 🧠 isCrownUnlocked
 * This gate checks if the crown is unlocked. Prevents false
 * crownings.
 *
 * @returns {boolean} - true if the crown is unlocked, false otherwise
 */
function isCrownUnlocked() {
  try {
    return $kv.get('crownUnlocked') === 'true';
  } catch (e) {
    return false; // fallback safely if key doesn't exist
  }
}


//---------------------------------------------------------------------- 
//            🤙🤙      ↓ HELPER FUNCTIONS      🤙🤙
//----------------------------------------------------------------------


/**
 *🤙 This helper calculates the Models desired username for messages based
 * on settings values.
 */
function getModelUsername(){

  const MODEL_NAME = DEFAULT_NAME === false ? USER_NAME : $room.owner;
  return MODEL_NAME;
}


/**
 * 🔢 getDethroneCost()
 * Returns the number of tokens required to dethrone the current Daddy.
 */
function getDethroneCost() {
  
  try {
    const total = Number($kv.get(`sessionDaddyTotal`)) || 0;
    return total + 1;
  } catch (e) {
    return 1;
  }
}

/**
 * 📉 getDethroneGap(username)
 * Returns how many more tokens a specific user needs to take the crown.
 */
function getDethroneGap(username) {
  const current = getCurrentDaddy();
  if (username === current) return 0;

  const dethroneCost = getDethroneCost();
  let challengerTotal = 0;

  try {
    const raw = $kv.get('Session_Tippers') || '[]';
    const sessionTippers = JSON.parse(raw);
    const challengerEntry = sessionTippers.find(entry => entry.username === username);
    challengerTotal = challengerEntry ? challengerEntry.tokens : 0;
  } catch (e) {
    challengerTotal = 0;
  }

  return dethroneCost - challengerTotal;
}



/**
 * 🎯 getGoalProgress()
 * Returns an object with the current and total goal values.
 * Used for displaying subject lines, panels, and status messages.
 */
function getGoalProgress() {
  const current = Number($kv.get('goalCurrent'));
  const total = GOAL_AMOUNT; // locked in at app start
  return { current, total };
}


/**
 * 🎯 updateGoalProgress()
 * Increases the current goal progress by a given number of tokens.
 * Safe to use in Tip Received and anywhere tips are processed.
 *
 * @param {number} tokens - Number of tokens to add to the goal
 */

function updateGoalProgress(tokens) {
  try {
    const current = Number($kv.get('goalCurrent'));
    const updated = current + tokens;
    $kv.set('goalCurrent', updated);
    return; // optional: return new value
  } catch (e) {
    return;
  }
}

/**
 * 
 * ✅ isGoalComplete()
 * Returns true if the current token progress has met or exceeded the goal.
 */
function isGoalComplete() {
  const { current, total } = getGoalProgress();
  return current >= total;
}



/**
 * 🎯🎁 checkGoalPrize()
 * Checks if goal is complete, announces goal and sends prize if applicable.
 */
function checkGoalPrize(tokens) {


  if (isGoalComplete()) {
    let msgSent = false;

    try {
      msgSent = $kv.get('goalMsgSent') === 'true';
    } catch (e) {
      msgSent = false;
    }

    if (!msgSent) {
      $kv.set('goalMsgSent', 'true'); // ✅ Prevent multiple messages
      sendMsg('goalCompleteSubject'); // ✅ Update room subject now that goal is Complete

      sendMsg('goalWon'); // 🎯 Public message

      if (PRIZE_ON) {
        const winner = getCurrentDaddy();
        const prize = PRIZE_LABEL;
        sendMsg('prizeWon', winner, prize); // 💝 Private message
      }
    }
  }
}

/**
 * 👑 getCurrentDaddy()
 * Returns the current top tipper for this session — the live crown holder.
 * Pulls from Session_AllTippers and sorts by token totals.
 */
function getCurrentDaddy() {
  try {
    const daddy = $kv.get('sessionDaddy');
    return daddy;
   
  } catch (e) {
    return 'None';
  }
}

/**
 * 🪙 getCurrentDaddyTotal()
 * Returns the session token total of the current crown holder.
 * Uses getCurrentDaddy() to find the leader, then pulls their total.
 */

function getCurrentDaddyTotal() {
  const daddy = getCurrentDaddy();
  if (daddy === 'None') return 0;

  try {
    return Number($kv.get(`sessionDaddyTotal`)) || 0;
  } catch (e) {
    return 0;
  }
}

/**
 * 🏆 getAllTimeDaddy()
 * Returns the username of the current All-Time top tipper.
 * Pulled from the top of the AllTime_TopTippers list.
 */
function getAllTimeDaddy() {

  try {
    let allTime = $kv.get('currentAllTime');
    return allTime;
  } catch (e) {
    return 'None';
  }
}

/**
 * 🪙 getAllTimeDaddyTotal()
 * Returns the total tokens from the current All-Time Daddy's record session.
 */
function getAllTimeDaddyTotal() {
  let daddyTotal = Number($kv.get(`currentAllTimeTotal`)) || 0;
  
  if (daddyTotal === '0') {
    return ;
  } 

  try {
    return daddyTotal;
  } catch (e) {
    return 0;
  }
}

//------------------------------------------------------------------
//             ⭐📺  BROADCAST PANEL SETTINGS ↓  📺⭐
//------------------------------------------------------------------

/**
 * 🧠 buildSessionLeaderboard
 * Sorts the Session_Tippers array by total tokens, highest to lowest.
 *
 * @returns {Array} - Sorted array of session tippers
 */
function buildSessionLeaderboard() {
  let sessionTippers = [];

  // STEP 1: Load the current session tippers
  try {
    const raw = $kv.get('Session_Tippers') || '[]';
    sessionTippers = JSON.parse(raw);
  } catch (e) {
    sessionTippers = [];
  }

  // STEP 2: Sort by tokens, highest first
  sessionTippers.sort((a, b) => b.tokens - a.tokens);

  return sessionTippers;
}

/**
 * This function builds us a nice hearts bar/ goal counter/ interactive
 * display for in the default  panel. It will automatically adjust 
 * the math based on $settings.goal_Value. VERY HANDY!
 * 
 * 💙🤍🤍
 */

function buildHeartBar(current, total, slots = 3) {
  const progress = total > 0 ? current / total : 0;
  const filled = Math.min(Math.round(slots * progress), slots);
  const empty = slots - filled;
  return '💙'.repeat(filled) + '🤍'.repeat(empty);
}

/** This function is used for padding the heart bar in the panel. 
 * eg. ( 100/2000   padding   heartbar )
 */

function padRight(text, totalWidth) {
  const pad = '\u00A0'; // non-breaking space
  return text + pad.repeat(Math.max(totalWidth - text.length, 0));
}

//----------------------------------------------------------------------
//
/** 
 *👻 Turns ON the suspense/ loading panel - Overriding the default panel.
 */

function startSuspenseLoop(interval = 0.5) {
  $kv.set('panelLocked', true);
  $kv.set('suspenseFrameIndex', 0);
  $callback.cancel('suspenseAnimation'); // safety
  $callback.create('suspenseAnimation', interval, true);
}
//-------------------------------------------------
/** 
 *🛑 Turns OFF the suspense/ loading panel - Restores the default panel.
 */

function stopSuspenseLoop() {
  $callback.cancel('suspenseAnimation');
  $kv.remove('suspenseFrameIndex');
  $kv.set('panelLocked', false);
  setDefaultPanel();
  $room.reloadPanel();
}


//-----------------------------------------------------------------------
/** This function updates the panel with a suspenseful, animated loading
 *  hearts bar, changes the text in the panel as well. Used for crowning.
 *  Turn it ON / OFF easily with start/stopSuspenseLoop()
 * 
 *                                                                         
 * ...🖤.........🖤🖤.........🖤🖤🖤 
 */
 
 //-----------------------------------------------------------------------

function updateSuspensePanel() {
  const frames = ['🖤', '🖤🖤', '🖤🖤🖤'];

  let index = 0;
  try {
    index = Number($kv.get('suspenseFrameIndex')) || 0;
  } catch (e) {
    // No empty brackets
  }

  const frame = frames[index % frames.length];
  $kv.set('suspenseFrameIndex', index + 1);

  // Define and set key values for the animated suspense panel.
  const row1 = `${frame}`;
  const row2 = `Crown is Loading...`
  $kv.set('panel_row1_value', row1);
  $kv.set('panel_row2_value', row2);
}
 
/**
 * 🧠 setDefaultPanel()
 * Updates the broadcast panel with current goal, Daddy, and All-Time Daddy.
 */
function setDefaultPanel() { 
  // ✅ 1.  Get Current Goal Progress -- Just updates the goal in the panel.
  const goalCurrent = $kv.get('goalCurrent'); // Working Perfectly

  // ✅ 2. Define the All Time Daddy for the Panel.

  let allTimeDaddy = 'None';
  let allTimeDaddyTotal = 0;
  
  try { 
    // This was set in updateAllTimeTippers
      allTimeDaddy = $kv.get('currentAllTime');
      allTimeDaddyTotal = Number($kv.get('currentAllTimeTotal'));
    
  } catch (e) {
    allTimeDaddy = 'None';
    allTimeDaddyTotal = 0;
  }

  // ✅ 3. Set our constants with the current daddy values. These values are always determined by 
  // A crown handling function. Run this AFTER changing crown status. 
  
let currentDaddy = ($kv.get('sessionDaddy') || 'None');
let currentDaddyTotal = 0;

try {
  const raw = $kv.get('Session_Tippers') || '[]';
  const tippers = JSON.parse(raw);
  const daddyEntry = tippers.find(entry => entry.username === currentDaddy);

  currentDaddyTotal = daddyEntry ? daddyEntry.tokens : 0;
} catch (e) {
  currentDaddyTotal = 0;
}


  const count = `${goalCurrent} / ${GOAL_AMOUNT}`;
  const padded = padRight(count, 12); // adjust width for your layout
  
  // ✅ 4. Set Broadcast Panel Template Properly
  
const row1_string = `${padded}${buildHeartBar(goalCurrent, GOAL_AMOUNT)}`;
const row2_string = `${currentDaddy} — ${currentDaddyTotal} tokens`;
const row3_string = `${allTimeDaddy} — ${allTimeDaddyTotal} tokens`;

  $kv.set('panel_row1_value', `${row1_string}`);
  $kv.set('panel_row2_value', `${row2_string}`);
  $kv.set('panel_row3_value', `${row3_string}`);

  
}

//----------------------------------------------------------------------
//          🏆🏆    ↓  LEADERBOARD FUNCTIONS  ↓  🏆🏆
//----------------------------------------------------------------------

/**
 * 🧠 updateAllTimeTippers
 * Updates the All-Time Tippers array if a user deserves a spot.
 *
 * @param {string} username - The user who just tipped
 * @param {number} sessionTotal - Their full session total after tipping
 */
function updateAllTimeTippers(username, sessionTotal) {
  let allTimeTippers = [];

  // STEP 1: Load the current All-Time tippers
  try {
    const raw = $kv.get('AllTime_Tippers') || '[]';
    allTimeTippers = JSON.parse(raw);
  } catch (e) {
    allTimeTippers = [];
  }

  // STEP 2: Check if user already exists
  const existingUser = allTimeTippers.find(entry => entry.username === username);

  if (existingUser) {
    // User already exists — update their record if they beat their own best
    if (sessionTotal > existingUser.tokens) {
      existingUser.tokens = sessionTotal;
    }
  } else {
    // New user — add to the list
    allTimeTippers.push({
      username: username,
      tokens: sessionTotal,
    });
  }

  // STEP 3: Sort by tokens descending
  allTimeTippers.sort((a, b) => b.tokens - a.tokens);

  // STEP 4: Keep only the Top 5
  allTimeTippers = allTimeTippers.slice(0, 5);

  // STEP 5: Save updated list back to KV
  $kv.set('AllTime_Tippers', JSON.stringify(allTimeTippers));

  // STEP 6: Update broadcast display for current all-time Daddy 
  if (allTimeTippers.length > 0) {
    const topUser = allTimeTippers[0];
    $kv.set('currentAllTime', `${topUser.username}`);
    $kv.set('currentAllTimeTotal', topUser.tokens); // already a number
  }
}


/**
 * 🧠 updateSessionTippers
 * Adds or updates a user's token total in the Session_Tippers array.
 *
 * @param {string} username - The user who tipped
 * @param {number} tokens - The number of tokens tipped
 */
function updateSessionTippers(username, tokens) {
  let sessionTippers = [];

  // STEP 1: Load the current session tippers
  try {
    const raw = $kv.get('Session_Tippers') || '[]';
    sessionTippers = JSON.parse(raw);
  } catch (e) {
    sessionTippers = [];
  }

  // STEP 2: Find the user in the list
  const existingUser = sessionTippers.find(entry => entry.username === username);

  if (existingUser) {
    // User already exists — add tokens
    existingUser.tokens += tokens;
  } else {
    // New user — add to the array
    sessionTippers.push({
      username: username,
      tokens: tokens,
    });
  }

  // STEP 3: Save the updated list back to KV
  $kv.set('Session_Tippers', JSON.stringify(sessionTippers));
}

//---------------------------------------------------------------------
//       👑👑👑      CROWN/DETHRONE LOGIC     👑👑👑
//------------------------------------------------------------------------

/**
 * 🧠 handleCrownReveal
 * Handles logic for the first crowning 
 *
 * @param {string} username - The user who tipped
 */
function handleCrownReveal(username) {
  const leaderboard = buildSessionLeaderboard();

  if (leaderboard.length === 0) {
    return;
  }

  const userEntry = leaderboard.find(entry => entry.username === username);

  if (!userEntry) {
    return;
  }

  const sessionTotal = userEntry.tokens;
  const currentTopUser = leaderboard[0].username;
  
// ↓ Below line is our GATE. This makes the function only run one time, then ignore it until app
//   Restarts!

  if (!isCrownUnlocked()) {
       // IF isCrownUnlocked is False, and IF user has reached the threshold, 
       // Set crownUnlocked to true first, then 
    if (sessionTotal >= $settings.init_Tip_Value && username === currentTopUser) {
      // ✅ User reached threshold and is top tipper — start suspense
       $kv.set('crownUnlocked', 'true');
       
       // STOP sending the "Tip this much to become daddy announcement RIGHT NOW."
       $callback.cancel('introDaddyPrompt');
        
        // Create the "repeatDaddyAnnounce" callback

      // Save username to kv so we can pass it along.

      $kv.set('crownCandidateUsername', username);
      $kv.set('crownCandidateTokens', sessionTotal);

      sendMsg('claimingCrown');
      
      
      
      startSuspenseLoop();
      // Start CB-compliant` delay
    
      $callback.cancel('revealCrown');
      $callback.create('revealCrown', SUSPENSE_DELAY, false);
    }
  } 
}

/**
 * 👑 handleCrownTransition
 * Called after a user tips. Checks if the crown has changed hands.
 *
 * @param {string} previousDaddy - The username of the previous Daddy (before the tip)
 */
function handleCrownTransition(username) {
  // If we're in this function it means that isCrownUnlocked = True and we SKIPPED crownReveal.
  const leaderboard = buildSessionLeaderboard();

  if (leaderboard.length === 0) {
    return;
  }

  const userEntry = leaderboard.find(entry => entry.username === username);

  if (!userEntry) {
    return;
  }

  const sessionTotal = userEntry.tokens;
  const currentTopUser = leaderboard[0].username;
  
   if (!isCrownUnlocked()) { return; //Do nothing
   } else {

  // If user is not the daddy, but they're within the CLOSE_CALL_THRESHOLD,
 const dethroneCost = getDethroneCost(); // or use currentTopTotal + 1 directly
 const dethroneGap = getDethroneGap(username);

  if (username !== currentTopUser && dethroneGap > 0 && dethroneGap <= CLOSE_CALL_THRESHOLD) {
  
  // Notify user they're close to stealing the crown!
  sendMsg('closeCall', username, dethroneGap);
 
  // Also send a dethrone warning to the current Daddy, "you're gonna lose your crown bro!"
  // Use a try/catch. Just in case the poor guy left the room for some reason. (He's buying more tokens, duh)
  try {
  sendMsg('daddyDethroneWarning', currentTopUser, dethroneGap);
} catch (e) {
  console.log(`User ${currentTopUser}: has left the room.`, e);
 }}
  

// The new session Daddy hasn't been set yet. 
// Set this now to the previousDaddy for the Crown Transition.
// Leaderboard is already updated with current value. Use this for the newDaddy. 
  const user = $user.username 
  const previousDaddy = ($kv.get('sessionDaddy') || 'None');
  const newDaddy = leaderboard[0].username;
  const newDaddyTokens = leaderboard[0].tokens;
  

    // If the previous Daddy is not equal to the NEW Daddy, 
    // The crown is changing hands!!
  // Is tip from the current daddy ? | Is previous Daddy "None" ?

  if (previousDaddy !== newDaddy && previousDaddy !== 'None') {
    // 👑 The crown is changing hands! ↑
    
    // Save the new Daddy name / token value so we can use it in Callbacks ↓

    $kv.set('new_Daddy', newDaddy)
    $kv.set('new_Daddy_Tokens', newDaddyTokens)
    
    // 🎉 ↓ Send dethrone message here, no spaghetti coding.
         // startSuspenseLoop(1); // update every 0.5 seconds

          
          sendMsg('deThronedDaddy', previousDaddy, newDaddy);
         
          

    
  // 🕑 10-second suspense delay. We cancel any old revealNewDaddy callbacks for perfect timing
  // We'll take care of the rest of this function in the revealNewDaddy Callback.
  // Canceling/Starting like this should handle Tip Battles quite well.
    startSuspenseLoop();
    $callback.cancel('revealNewDaddy');
    $callback.create('revealNewDaddy', SUSPENSE_DELAY, false );
    

    // User is already the Daddy, send them a thank you message
    
    } else if (previousDaddy === newDaddy && previousDaddy !== 'None' && user === newDaddy ) {
      
  // They're already Daddy and tipped again

      sendMsg('thankYouDaddy', newDaddy);

      setDefaultPanel();
      $room.reloadPanel(); // Optional: Force full refresh
     }
   }
}   




//----------------------------------------------------------------------
//                 ✉️📬     APP MESSAGE LOGIC ↓    📬✉️
//           App messages are controlled by the following code.
//-----------------------------------------------------------------------


/**💥 This awesome block converts our string of text to unicode using
 *    a nifty unicode map so we can send bolded messages. 
 * 
 */
function toUnicodeBold(str) {
  const boldMap = {
    A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝',
    K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧',
    U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭',
    a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷',
    k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁',
    u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
    0: '𝟬', 1: '𝟭', 2: '𝟮', 3: '𝟯', 4: '𝟰', 5: '𝟱', 6: '𝟲', 7: '𝟳', 8: '𝟴', 9: '𝟵'
  };

  return str.split('').map(c => boldMap[c] || c).join('');
}




const messageList = {
  // SYSTEM MESSAGES

    appInit: {
    text: '⏳ Tip Daddy is initializing...',
    log: true
  },
  appStarted: {
    text: '🚀 Tip Daddy has started! The leaderboard is live, and the crown is up for grabs. Tip to climb to the top!',
    log: true,
    
  },
   
    setAllTimeSuccess: {
    text: (user, target, tokens) => `✅ Set ${target} to ${tokens} tokens on the All-Time leaderboard.`,
    private: true
  },

  setAllTimeInvalid: {
    text: (user) => `⚠️ Invalid token amount. Use: /setalltime username tokens`,
    private: true
  },

  setAllTimeFormatError: {
    text: (user) => `⚠️ Incorrect format. Use: /setalltime username tokens`,
    private: true
  },

  clearAllTimeSuccess: {
    text: (user) => '🧹 All-Time leaderboard has been cleared.',
    private: true
  },
  appResetComplete: {
  text: '🔄 Tip Daddy has been restarted!',
  color: "#ffffff",
  bgColor: "#22c55e",
  private: false,
  log: true,
  },
    appEnded: {
    text: '👋 Session ended...',
    log: true,
    
  },

  // CROWN / GAME MESSAGES
  firstDaddyCrowned: {
  text: (username) => `👑 The crown has officially been claimed. ${username} is now ${getModelUsername()}'s Daddy.`,
  color: "#ffffff",
  bgColor: "#4f46e5"
},
  closeCall: {
    text: (user, tokensNeeded) => `😱 ${toUnicodeBold(user)} is just ${tokensNeeded} tokens away from stealing the crown!`,
    color: "#ffffff",
    bgColor: "#4f46e5",
    private: true
  },
    daddyDethroneWarning: {
    text: (challenger, tokensBehind) => `⚠️ ${challenger} is only ${tokensBehind} tokens from stealing your crown. Protect it or lose it!`,
    color: "#000000",
    bgColor: "#f97316",
    private: true
  },
 
deThronedDaddy: {
  text: (previousDaddy, newDaddy) => `👀 ${previousDaddy} was dethroned by ${newDaddy}! The crown is changing hands.`,
  color: "#ffffff",
  bgColor: "#4f46e5"
},

  isDaddy: {
    text: (username) => `${username} is ${getModelUsername()}'s new Daddy! 👑`,
    color: "#ffffff",
    bgColor: "#4f46e5"
  },

    prizeWon: {
    text: (username, prize) => `🎁 ${username} won the prize! 💝 Prize: ${prize}`,
    color: "#ffffff",
    bgColor: "#4f46e5",
    private: true
  },
    thankYouDaddy: {
    text: () => {
    const msgText = $settings.thank_You_Daddy
    return `☁️ ${msgText} ☁️`
    },

    color: "#ffffff",
    bgColor: "#4f46e5",
    private: true
  },
  announceCurrentDaddy: {
  text: () => {
    const daddy = getCurrentDaddy();
    const name = getModelUsername();
    const cost = getDethroneCost();
    return `👑 ${daddy} is currently ${name}'s Daddy. You must tip at least ${cost} total tokens in this session to steal the crown.`;
  },
  color: "#ffffff",
  bgColor: "#4f46e5",
  callback: true
},
tipToBecomeDaddy: {
  text: () => {
    const amount = DADDY_PRICE;
    const name = getModelUsername();
    return `👑 Tip ${amount} tokens to become ${name}'s Daddy!`;
  },
  color: "#ffffff",
  bgColor: "#4f46e5",
  callback: true,
},
goalUpdateSubject: {
  type: 'subject',
  text: () => {
    const emoji = SUBJ_EMOJI;
    const label = GOAL_LABEL;
    const hashtags = USE_HASHTAGS ? HASH_TAGS : '';
    
    return `${label} @ Goal ${emoji} ${hashtags}`.trim();
  },
  log: true
  },
    goalCompleteSubject: {
    type: 'subject',
    text: () => '🎯 GOAL COMPLETED! Thank you to all the amazing tippers 💖',
    log: true,
  },

    goalWon: {
    text: "🎯 Goal complete!",
    color: "#000000",
    bgColor: "#facc15"
    }
  };


/**📬 The sendMsg module is the heart of the app's message system. 
 * messages aren't hardcoded, they're cataloged in a dictionary
 * and sent out using this neat little command.
 * 
 * sendMsg('messageName')
 */
function sendMsg(key, ...args) {
  const msg = messageList[key];

  // ❌ If message key isn't defined, throw a helpful error
  if (!msg) {
    $room.sendNotice("❓ Unknown message key: " + key);
    return;
  }

  // 🧠 Evaluate text if it's a function, or use as-is
  let text = typeof msg.text === 'function' ? msg.text(...args) : msg.text;

  // 🎯 Handle subject messages first (overrides all other types)
if (msg.type === 'subject') {
  $room.setSubject(text);

  if (msg.log === true) {
    console.log(`[sendMsg] Subject set to: ${text}`);
  }
  return; // Skip normal chat notice
}

  // 🎨 Chat/PM message options
  const options = {
    color: msg.color || "#ffffff",
    bgColor: msg.bgColor || "#000000"
  };

  // 💌 Route private messages to specific user
  if (msg.private === true) {
    const targetUser = args[0]; // Must pass username as first argument
    options.toUsername = targetUser;
  }

  // 🔁 Define what actually sends the message
  const sendNow = () => {
    $room.sendNotice(text, options);
    if (msg.log === true) {
      console.log(`[sendMsg] Message sent:`, { key, text, options });
    }
  };

  // ⏱️ Apply delay if defined, otherwise send immediately
  if (msg.delay) {
    $callback.cancel('msg_' + key);
    $callback.create('msg_' + key, msg.delay, false, sendNow);
  } else {
    sendNow();
  }
}

// 👀 Utility: Check if a message is eligible to be used by a callback loop
sendMsg.isCallbackEnabled = (key) => {
 return messageList[key] && messageList[key].callback === true;

};


//------------------------------------------- --------------------
//         🛑🛑     STOP / RESET FUNCTIONS     🛑🛑
//----------------------------------------------------------------


/**
 *💯 This function resets the app : It's the same as stop/restart 
 * 
 */
function performFullReset() {
// 🧹 /reset command (Tip Daddy 1.1 clean version)

  // ✅ 1. Clear session leaderboard
  $kv.remove('Session_Tippers');

  // ✅ 2. Reset crownUnlocked
  $kv.set('crownUnlocked', false);

  // ✅ 3. (Optional) Reset goal progress
  $kv.remove('goalCurrent');
  $kv.set('goalCurrent', 0);
  $kv.set('goalMsgSent', false);
  $kv.set('sessionDaddy', 'None');
  $kv.set('sessionDaddyTotal', 0);
  $kv.set('appSessionInitialized', false);

  // ✅ 4. Cancel any active crown-related callbacks
  $callback.cancel('introDaddyPrompt');
  $callback.cancel('repeatDaddyAnnounce');
  $callback.cancel('revealCrown');
  $callback.cancel('revealNewDaddy');
  setDefaultPanel();
 
  sendMsg('appResetComplete'); 
  
  sendMsg('tipToBecomeDaddy');
  $callback.cancel('introDaddyPrompt')
  $callback.create('introDaddyPrompt', 60 * TIME_VAR, true); // 🔁 Loop reminder

}

/**
 * 💥 Clear All : 
 * Fully wipe the App Memory! 
 * This only runs if you type the special command '/###1'
 * This will clear ALL KEYS for the ENTIRE APP including the ALLTIME KEYS
 * Mostly for DEV purposes.
 */


function clearAll() {
    $kv.clear()
}

/**
 * 💥 App Stop 1.0.4.1
 * This runs when the broadcaster stops the app.
 */

function onStop() {

  // ✅ 1. Clear session leaderboard
  $kv.remove('Session_Tippers');

  // ✅ 2. Reset crownUnlocked
  $kv.set('crownUnlocked', false);

  // ✅ 3. Reset goal progress
  $kv.remove('goalCurrent');
  $kv.set('goalCurrent', 0);
  $kv.set('goalMsgSent', false)
  $kv.set('sessionDaddy', 'None')
  $kv.set('sessionDaddyTotal', 0)
  $kv.set('appSessionInitialized', false);



  // ✅ 4. Cancel any active crown-related callbacks
  sendMsg('appEnded'); 
  $callback.cancel('introDaddyPrompt');
  $callback.cancel('repeatDaddyAnnounce');
  $callback.cancel('revealCrown');
  $callback.cancel('revealNewDaddy');
  setDefaultPanel();
  $room.reloadPanel();
  
  
 


  // ⚠️ DO NOT clear All-Time leaderboard!
  // $kv.remove('AllTime_Tippers');  --> NOOOOOO!!!
}



