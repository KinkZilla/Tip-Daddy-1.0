
//  ████████╗██╗██████╗     ██████╗  █████╗ ██████╗ ██████╗ ██╗   ██╗ 
//  ╚══██╔══╝██║██╔══██╗    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝
//     ██║   ██║██████╔╝    ██║  ██║███████║██║  ██║██║  ██║ ╚████╔╝ 
//     ██║   ██║██╔═══╝     ██║  ██║██╔══██║██║  ██║██║  ██║  ╚██╔╝  
//     ██║   ██║██║         ██████╔╝██║  ██║██████╔╝██████╔╝   ██║      
//     ╚═╝   ╚═╝╚═╝         ╚═════╝ ╚═╝  ╚═╝╚═════╝╚═════╝     ╚═╝         
//                         👑 TIP DADDY v1.0.5 👑
//                             By: kink_zilla

/**
 * Tip Daddy
 * Version: 1.0.5
 * Author: kink_zilla
 *
 * Comments:
 * If you're branching Tip Daddy, you'll find useful information on
 * GitHub. "https://kinkzilla.github.io/Tip-Daddy-1.0/"  👌👍
 */



// 🧠 Tip Daddy Constants & Runtime Lock-In

const APP_NAME = "Tip Daddy 1.0";
const APP_VERSION = "1.0.5";

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
 * This is how often we send the goal prize announcement.
 */
const GOAL_PRIZE_TIME = $settings.rolling_notif_1;

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
 * This is the text color of the thank you notice.
 */
const THANK_YOU_TXT = $settings.thank_you_text; 

/**
 * This is the background color of the thank you notice.
 */
const THANK_YOU_BG = $settings.thank_you_background; 

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
const CLOSE_CALL_THRESHOLD = $settings.nearly_There;

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
const USE_HASHTAGS = $settings.use_Tags;

/** 
 * This is the color of the Announcement text
 */
const ANNC_TXT = $settings.txt_Color;

/**
 * This is the color of the Announcement Background
 */
const ANNC_BG = $settings.bkg_Color;

/**
 * This is the color of the goal prize announcement text
 */
const GOAL_PRIZE_TXT = $settings.goal_Prize_Txt;

/**
 * This is the color of the goal prize announcement background
 */
const GOAL_PRIZE_BG = $settings.goal_Prize_BG;

/** This is the color of the Tip Menu text */

const TIP_MENU_TXT = $settings.tipMenu_textColor;

/**
 * This is the color of the Tip Menu Background
 */
const TIP_MENU_BG = $settings.tipMenu_bgColor;

/**
 * This is the tip menu emoji :)
 */

const TIP_MENU_EMOJI = $settings.tip_menu_emoji;

/**
 * This is the text color of the Tip Menu Purchase Alert Notice
 */

const MENU_ALERT_TXT = $settings.menu_alert_text;

/**
 * This is the bg color of the Tip Menu Purchase Alert Notice
 */

const MENU_ALERT_BACK = $settings.menu_alert_bg;
//----------------------------------------------------------------------
//                   💥    INITIALIZATION    💥
//----------------------------------------------------------------------
/**                   
*  🌩️  Called at App Start to safely initialize all session-based 
*      KV keys. Ensures goal, leaderboard, and crown systems start
*      cleanly and only once per session.
*/

function initializeAppSessionState() {
 
    // 🎯 Goal state
    
     
     try {
       if (!$kv.get('currentAllTime')) {
  $kv.set('currentAllTime', 'None - 0 tokens');
}
  } catch (e) {
     console.log(`Failed to set currentAllTime on app start`);
  }
   
     try {
       if (!$kv.get('currentAllTimeTotal')) {
  $kv.set('currentAllTimeTotal', 0);

}
  } catch (e) {
     console.log(`Failed to set currentAllTimeTotal on app start`);
  }






     $kv.set('goalCurrent', 0);
     $kv.set('sessionDaddy', 'None'); // Set them as Current Daddy in panel.
     $kv.set('sessionDaddyTotal', 0)
     $kv.set('crownUnlocked', 'false');
     $kv.set('goalMsgSent', false);
     $kv.set('frameNumber', 0);
     $kv.set('panelLocked', false);
     $kv.set('lastLeaderboardMode', 'AllTime'); // or 'Session' 
     $kv.set('panelLockedForTimer', false);
     $kv.remove('minutesLeft');
     $kv.remove('timerLabel');
     $kv.set('timerQueue', JSON.stringify([])); // Optional if you want to clear on restart
     $kv.set('row1_label_value', 'Received / Goal');
     $kv.set('panel_row1_value', `0/${GOAL_AMOUNT}`);
     $kv.set('row2_label_value', 'Current Daddy');
     $kv.set('panel_row2_value', `None`);
     $kv.set('row3_label_value', 'All Time Daddy 🏆');
     $kv.set('panel_row3_value', 'None');

     
     $kv.remove('Session_Tippers');
      // Must be a string
    // 🧱 Leaderboard + crown state
     sendMsg('goalUpdateSubject'); // 🎯 Sets subject and THEN appStarted message
     setDefaultPanel();
     $room.reloadPanel();
     

    
    
  
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
 * This is our timer queue function. 
 */
function addToTimerQueue(label, duration) {
  let queue = [];

  // Step 1: Load existing queue safely
  try {
    queue = JSON.parse($kv.get('timerQueue') || '[]');
    if (!Array.isArray(queue)) throw new Error(); // catch corrupted data
  } catch (e) {
    queue = [];
  }

  // Step 2: Push new item
  queue.push({
    label: label,
    duration: Number(duration)
  });

  // Step 3: Save it back to KV
  $kv.set('timerQueue', JSON.stringify(queue));

  // Optional: Log to dev console
  console.log(`📦 Queued timer: ${label} – ${duration} min (Queue size: ${queue.length})`);
}




/**
 * This helper will build the session leaderboard then post it to the chat when we call it.
 */
function postAlternatingLeader() {
  let showAllTime = false;

  // 🧠 Check which type we showed last
  try {
    showAllTime = $kv.get('lastLeaderboardMode') === 'Session' ? true : false;
  } catch (e) {
    showAllTime = false; // default to AllTime if nothing exists
  }

  let leaderboardText = "------ Top 5 ------\n";

  if (showAllTime) {
    sendMsg('leaderTitleAllTime'); // 👑 Announce All-Time mode

    let allTimeTippers = [];
    try {
      allTimeTippers = JSON.parse($kv.get('AllTime_Tippers')) || [];
    } catch (e) {
      allTimeTippers = [];
    }

    for (let i = 0; i < 5; i++) {
      if (allTimeTippers[i]) {
        leaderboardText += `${allTimeTippers[i].username}: ${allTimeTippers[i].tokens} tokens\n`;
      } else {
        leaderboardText += "None — 0 tokens\n";
      }
    }

    $kv.set('lastLeaderboardMode', 'AllTime');

  } else {
    sendMsg('leaderTitle'); // 📊 Announce Session mode

    let sessionTippers = [];
    try {
      sessionTippers = JSON.parse($kv.get('Session_Tippers')) || [];
    } catch (e) {
      sessionTippers = [];
    }

    sessionTippers.sort((a, b) => b.tokens - a.tokens);

    for (let i = 0; i < 5; i++) {
      if (sessionTippers[i]) {
        leaderboardText += `${sessionTippers[i].username}: ${sessionTippers[i].tokens} tokens\n`;
      } else {
        leaderboardText += "None — 0 tokens\n";
      }
    }

    $kv.set('lastLeaderboardMode', 'Session');
  }

  // Send the final board to the room
  $room.sendNotice(leaderboardText.trim(), {
    color: LEADER_TXT,
    bgColor: LEADER_BG,
  });
}




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

function announceCurrentDaddyNow() {
  sendMsg('announceCurrentDaddy'); // 💬 Send now for visibility
  $callback.cancel('repeatDaddyAnnounce'); // ❌ Stop any pending fallback
  $callback.create('repeatDaddyAnnounce', 60 * TIME_VAR, true); // 🔁 Restart quiet-loop fallback
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
  // Math.floor instead of Math.round - No Rounding we want exact numbers here.
  const filled = Math.min(Math.floor(slots * progress), slots); 
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
  const goalCurrent = $kv.get('goalCurrent') || 0; // Working Perfectly

  // ✅ 2. Define the All Time Daddy for the Panel.

  let allTimeDaddy = 'None';
  let allTimeDaddyTotal = 0;
  
  try { 
    // This was set in updateAllTimeTippers
      allTimeDaddy = $kv.get('currentAllTime') || 'None';
      allTimeDaddyTotal = Number($kv.get('currentAllTimeTotal') || 0);
    
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
  
  $kv.set('row1_label_value', 'Received / Goal');
  $kv.set('panel_row1_value', `${row1_string}`);
  $kv.set('row2_label_value', 'Current Daddy');
  $kv.set('panel_row2_value', `${row2_string}`);
  $kv.set('row3_label_value', 'All Time Daddy 🏆');
  $kv.set('panel_row3_value', `${row3_string}`);

  
}

function startTimerLoop(label, duration) {
  $kv.set('panelLockedForTimer', true);
  $kv.set('minutesLeft', duration);
  $kv.set('timerLabel', label);

  // Start the timer loop (once per minute)
  $callback.cancel('timerTick');
  $callback.create('timerTick', 60, true);

  // Show the first panel frame immediately
  updateTimerPanel();
  $room.reloadPanel();
}

function stopTimerLoop() {
  $callback.cancel('timerTick');
  $kv.remove('minutesLeft');
  $kv.remove('timerLabel');
  $kv.set('panelLockedForTimer', false);

  stopTimerPanel(); // This handles queue → next item or reset panel
}


function updateTimerPanel() {
  const label = $kv.get('timerLabel') || '';
  let minutesLeft = Number($kv.get('minutesLeft') || 0);

  if (minutesLeft <= 0) {
    stopTimerLoop();
    return;
  }

  // Prepare display strings
  const timeText = `${minutesLeft} minute${minutesLeft === 1 ? '' : 's'}... `;

  // Load next item (if any)
  let queue = [];
  try {
    queue = JSON.parse($kv.get('timerQueue') || '[]');
    if (!Array.isArray(queue)) throw new Error();
  } catch (e) {
    queue = [];
  }

  const nextItem = queue.length > 0 ? queue[0].label : '—';

  // Update all panel rows
  $kv.set('row1_label_value', 'Tipped For');
  $kv.set('panel_row1_value', label);
  $kv.set('row2_label_value', 'Time Remaining');
  $kv.set('panel_row2_value', timeText);
  $kv.set('row3_label_value', 'Next in Queue');
  $kv.set('panel_row3_value', nextItem);
  $kv.set('minutesLeft', minutesLeft - 1);
  $room.reloadPanel();
}



function stopTimerPanel() {
  let queue = [];

  try {
    queue = JSON.parse($kv.get('timerQueue') || '[]');
    if (!Array.isArray(queue)) throw new Error();
  } catch (e) {
    queue = [];
  }

  if (queue.length > 0) {
    const next = queue.shift();
    $kv.set('timerQueue', JSON.stringify(queue));

    // Start next item
    startTimerLoop(next.label, next.duration);
  } else {
    // Reset panel to default view
    setDefaultPanel();
    $room.reloadPanel();
  }
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

/**
 * This function creates a Tip Menu array that will be defined by the model.
 */

function updateTipMenu(item, price, username, timer = null) {

  let menu = [];

  // STEP 1: Load the current menu
  try {
    const raw = $kv.get('tipMenu') || '[]';
    menu = JSON.parse(raw);
  } catch (e) {
    menu = [];
  }

  // STEP 2: Check for duplicate price
  const priceExists = menu.some(entry => Number(entry.price) === Number(price));
  if (priceExists) {
    sendMsg('duplicateTipMenuPrice', $user.username); // ✅ FIXED key
    return;
  }

  // STEP 3: Check if item exists (case-insensitive)
  const existing = menu.find(entry => entry.item.toLowerCase() === item.toLowerCase());

  if (existing) {
    existing.item = item;
    existing.price = Number(price);
  } else {
menu.push({
  item: item,
  price: Number(price),
  ...(timer && { timer: Number(timer) }) // ✅ only adds if timer is provided
});


    // 🧠 If this was the first item, send onboarding message
    if (menu.length === 1) {
      
      $callback.cancel('tipMenuAnnc');
      $callback.create('tipMenuAnnc', 60 * $settings.tip_menu_time, true);
    }
  }

  // STEP 4: Sort and save
  menu.sort((a, b) => a.price - b.price);
  $kv.set('tipMenu', JSON.stringify(menu));

  // ✅ STEP 5: Confirm success
  sendMsg('tipMenuUpdated', $user.username, item, price);
}




//---------------------------------------------------------------------
//       👑👑👑      CROWN/DETHRONE LOGIC     👑👑👑
//------------------------------------------------------------------------

function handleCrownRevealDuringTimer(username) {
  const leaderboard = buildSessionLeaderboard();

  if (leaderboard.length === 0) return;

  const userEntry = leaderboard.find(entry => entry.username === username);
  if (!userEntry) return;

  const sessionTotal = userEntry.tokens;
  const currentTopUser = leaderboard[0].username;

  if (!isCrownUnlocked()) {
    if (sessionTotal >= $settings.init_Tip_Value && username === currentTopUser) {
      $kv.set('crownUnlocked', 'true');
      $kv.set('sessionDaddy', username);
      $kv.set('sessionDaddyTotal', sessionTotal);

      $callback.cancel('introDaddyPrompt');
      $callback.cancel('repeatDaddyAnnounce');
      $callback.create('repeatDaddyAnnounce', 60 * TIME_VAR, true);

      sendMsg('firstDaddyCrowned', username);

         if (isGoalComplete()) {
   if (PRIZE_ON) {
        const winner = getCurrentDaddy();
        const prize = PRIZE_LABEL;
        sendMsg('prizeWon', winner, prize); // 💝 Private message
        $callback.cancel('AnnouncegoalPrize');
        }
}

      // No suspense loop
    }
  }
}



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

function handleCrownTransitionDuringTimer(username) {
  const leaderboard = buildSessionLeaderboard();
  if (leaderboard.length === 0) return;

  const userEntry = leaderboard.find(entry => entry.username === username);
  if (!userEntry) return;

  const sessionTotal = userEntry.tokens;
  const currentTopUser = leaderboard[0].username;

  if (!isCrownUnlocked()) return;

  const previousDaddy = $kv.get('sessionDaddy') || 'None';
  const newDaddy = leaderboard[0].username;
  const newDaddyTokens = leaderboard[0].tokens;

  if (previousDaddy !== newDaddy && previousDaddy !== 'None') {
    // Crown is changing hands
    $kv.set('new_Daddy', newDaddy);
    $kv.set('new_Daddy_Tokens', newDaddyTokens);

    $kv.set('sessionDaddy', newDaddy);
    $kv.set('sessionDaddyTotal', newDaddyTokens);

    sendMsg('deThronedDaddy', previousDaddy, newDaddy);
    sendMsg('isDaddy', newDaddy, newDaddyTokens);


     if (isGoalComplete()) {
   if (PRIZE_ON) {
        const winner = getCurrentDaddy();
        const prize = PRIZE_LABEL;
        sendMsg('prizeWon', winner, prize); // 💝 Private message
        $callback.cancel('AnnouncegoalPrize');
        }
}

    try { $kv.remove('new_Daddy'); } catch (e) {
      //noempty
    }
    try { $kv.remove('new_Daddy_Tokens'); } catch (e) {
      //noempty
    }

  } else if (previousDaddy === newDaddy && previousDaddy !== 'None' && username === newDaddy) {
    try {
      $kv.set('sessionDaddyTotal', newDaddyTokens);
    } catch (e) {
      //noempty
    }

    sendMsg('thankYouDaddy', newDaddy);
    announceCurrentDaddyNow();
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
      
      
      // Update session total for current Daddy so dethrone cost stays accurate
 // ✅ Update dethrone cost using the Session_Tippers_<user> value
  try {
    const currentTotal = newDaddyTokens || 0;
    $kv.set('sessionDaddyTotal', currentTotal);
  } catch (e) {
    console.log('⚠️ Failed to update sessionDaddyTotal for current Daddy');
  }


      
  // They're already Daddy and tipped again

      sendMsg('thankYouDaddy', newDaddy);
      announceCurrentDaddyNow();

// We gated this function so Daddy doesnt cancel the crowning
// ceremony unkowningly when he tips more tokens. ↓
  if (!$kv.get('panelLocked')) {
      setDefaultPanel();
      $room.reloadPanel(); // Optional: Force full refresh
     }
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


const messageList = {
  // SYSTEM MESSAGES

    appInit: {
    text: '⏳ Tip Daddy is initializing...',
    log: true
  },
  appStarted: {
    text: '🎬 Tip Daddy has started! The leaderboard is live, and the crown is up for grabs. Tip to climb to the top!',
    color: "#ffffff", // White text
    bgColor: "#3ea308", // Green 
    log: true,
    
  },
   
  // Tip Menu — General Usage & Onboarding
tipMenuWelcome: {
  text: ":banana Tip Menu is enabled! Use /setmenu item price to add your first item.\nExample: /setmenu 🍑 Flash This Cute Lil Butt 200   Type /help for more examples and a list of commands",
  private: true
},
tipMenuDisabled: {
  text: "⚠️ Tip Menu is currently disabled. You can enable it in the app settings to start adding items.",
  private: true
},
emptyTipMenu: {
  text: `📋 The tip menu hasn’t been set yet. Use /setmenu[space]⚡item goes here[space]price to add items.`,
  color: "#000000", // White text
  bgColor: "#FCEB30", // Alert Yellow
  log: true
},

// /setmenu command
invalidSetMenuUsage: {
  text: "⚠️ Invalid format. Use: /setmenu item price\nExample: /setmenu 🍑 Flash elbow 200\nUse /help for more info.",
  private: true
},
duplicateTipMenuPrice: {
  text: "⚠️ You already have a tip menu item with that price. Use a different amount.",
  private: true
},
tipMenuUpdated: {
  text: (username, item, price) => `✅ Tip menu updated: "${item}" – ${price} tokens.`,
  private: true
},
tipMenuMatch: {
  text: (username, item, price) => `🎁 ${username} tipped ${price} tokens for: ${item}`,
  log: true,
  color: `${MENU_ALERT_TXT}`, // custom
  bgColor: `${MENU_ALERT_BACK}` // custom
  
},
timerQueuedPublic: {
  text: (username, label) => `📣 ${label} has been added to the queue! It will begin right after the current countdown.`,
  log: true
},

helpMsg: {
  text: "Help \n This tip menu is a little different than others. If you're having issues please read this carefully. \n This menu will automatically sort the added items by price - Low to High.\n You will update this Tip Menu with chat commands, so you'll need to type one of the following commands into your chat room. \n /menu - Shows the Menu, can be used by any users. \n /setmenu - This command will set the menu items and prices, it is a broadcaster only command. Only a broadcaster or a Mod can use it. \n /clearmenu - This will clear the menu of all items permanently. Also a broadcaster only command. \n /removeitem - This will remove individual items from the Tip Menu. Broadcaster only. \n \n IMPORTANT NOTES: \n\n The /removeitem and /setmenu commands use the same principles.\n First you'll type /removeitem or /setmenu, then you'll push the spacebar, and enter in the item. For example: '5 Spanks'. Then you'll push the spacebar again, and type the price of this item. Example: 20  \n So all together we have /setmenu [SPACE] 5 spanks [SPACE] 20 \n It should look something like this:\n/setmenu 5 spanks 20 \n \n Push enter and you should see:\n ✅ Tip menu updated: '5 spanks' – 20 tokens. \n Now you can view the updated menu by typing the /menu command and pushing enter again to see the new item we just made. \n\n You can now also add an optional timer to the menu item by adding an extra number to the end that represents the desired timer length in minutes. \n For example: /setmenu Sexy dance moves :) 100 5 - The extra '5' at the end will give us a 5 minute timer in the broadcast panel whenever someone tips 100 for sexy dance moves. Do it like /setmenu[space]Sexy Dance Moves[space]Price[space]timerlength\n\n To remove that item from the Tip Menu simply type:\n /removeitem 5 spanks \n Then push enter. \n 🗑️ Removed '5 Spanks' from the tip menu. \n The /removeitem command isn't case sensitive, but you will need to match the text exactly. It might be easier to copy/paste the item you want to remove like /removeitem[space]PASTE\n If you get too confused you can just type /clearmenu and start completely over. If you absolutely need help, tip one token to kink_zilla and tell me what you needed help with in the tip message, or try sending me a dm.",
  private: true
},

// /clearmenu command
clearTipMenuSuccess: {
  text: "🧹 Tip menu cleared successfully.",
  private: true
},
clearTipMenuError: {
  text: "⚠️ Failed to clear the tip menu. Try again.",
  private: true
},

// /removeitem command
invalidRemoveItemUsage: {
  text: "⚠️ Invalid format. Use: /removeitem item name\nExample: /removeitem Flash elbow",
  private: true
},
removeItemNotFound: {
  text: (username, item) => `❌ Could not find "${item}" in the tip menu.`,
  private: true
},
removeItemSuccess: {
  text: (username, item) => `🗑️ Removed "${item}" from the tip menu.`,
  private: true
},




    setAllTimeSuccess: {
    text: (user, target, tokens) => `👍 Set ${target.toUpperCase()} to ${tokens} tokens on the All-Time leaderboard.`,
    color: "#ffffff", // White text
    bgColor: "#3ea308", // Green 
    private: true
  },

  setAllTimeInvalid: {
    text: (user) => `⚠️ Invalid token amount. Use: /setalltime username tokens`,
    color: "#ffffff", // White text
    bgColor: "#eb8407", // Alert orange 
    private: true
  },

  setAllTimeFormatError: {
    text: (user) => `⚠️ Incorrect format. Use: /setalltime username tokens`,
    color: "#ffffff", // White text
    bgColor: "#eb8407", // Alert orange 
    private: true
  },

  clearAllTimeSuccess: {
    text: (user) => '👍 All-Time leaderboard has been cleared.',
    color: "#ffffff", // White text
    bgColor: "#3ea308", // Green 
    private: true
  },
  clearAllTimeInvalid: {
    text: (user) => '⚠️ You may not alter the panel during the crowning process...',
    color: "#ffffff", // White text
    bgColor: "#eb8407", // Alert orange 
    private: true
  },
  appResetComplete: {
  text: '🔄 Tip Daddy has been restarted!',
  color: "#ffffff", // White text
  bgColor: "#3ea308", // Green 
  private: false,
  log: true,
  },
    appEnded: {
    text: '👋 Session ended...',
    color: "#ffffff", // White text
    bgColor: "#3ea308", // Green 
    log: true,
    
  },

  // CROWN / GAME MESSAGES
firstDaddyCrowned: {
  text: (username) => {
    const model = getModelUsername();
    return `👑 The crown has officially been claimed. ${username.toUpperCase()} is now ${model}'s Daddy.`;
  },
  color: "#ffffff", // White Text
  bgColor: "#3EA308", // Green 
},

closeCall: {
  text: (user, tokensNeeded) => {
    const options = [
      `😱 You're just ${tokensNeeded} tokens away from claiming the crown!`,
      `👑 Only ${tokensNeeded} more tokens and the crown is yours!`,
      `🔥 ${tokensNeeded} tokens stand between you and Daddy status.`,
      `⚔️ So close! Tip ${tokensNeeded} more tokens to steal the crown.`,
      `💣 You nearly have it! Just ${tokensNeeded} more tokens to take control.`,
      `🫣 That was close! You're ${tokensNeeded} tokens from becoming Daddy.`,
      `💋 One more push — ${tokensNeeded} tokens and the crown is yours.`,
      `👀 Don’t stop now — just ${tokensNeeded} tokens left to dethrone Daddy.`,
    ];
    return options[Math.floor(Math.random() * options.length)];
  },
    color: `${ANNC_TXT}`, // Custom: Default is White
    bgColor: `${ANNC_BG}`, // Custom: Default is Royal Blue
  private: true,
  },

    daddyDethroneWarning: {
    text: (challenger, tokensBehind) => `⚠️ ${challenger} Another user is only ${tokensBehind} tokens from stealing your crown. Protect it or lose it!`,
    color: "#ffffff", // White text
    bgColor: "#f94716", // Alert Red
    private: true
  },

claimingCrown: {
  text: () => {
    const options = [
      '⚔️ A challenger approaches... The throne is being claimed!',
      '👑 A new ruler rises to claim the throne!',
      '🛡️ The kingdom stirs — The crown is being claimed!',
      '🛡️ Someone\'s feeling bold... They\'ve just claimed the crown!',
      '🏹 The battle has begun... The crown is being claimed!',
      '🚨 Game on! Someone just stepped up to claim the crown!',
      '👀 A new Daddy approaches.',
      '🏰 A new Daddy is claiming the throne.',
    ];
    return options[Math.floor(Math.random() * options.length)];
  },
  color: "#ffffff", // white Text
  bgColor: "#000000", // Black
},

 
deThronedDaddy: {
  text: (previousDaddy, newDaddy) => {
    const options = [
      `👀 ${previousDaddy} was dethroned by ${newDaddy}! The crown is changing hands.`,
      `💔 ${previousDaddy}, your reign has ended. ${newDaddy} is being crowned.`,
      `😈 ${newDaddy} just stole the crown from ${previousDaddy}. Let the crowning commence!`,
      `⚔️ A fierce battle ends with ${newDaddy} toppling ${previousDaddy} for the crown!`,
      `👑 ${previousDaddy} has been overthrown — ${newDaddy} is being crowned!`,
      `🪓 Off with their crown! ${newDaddy} just dethroned ${previousDaddy}.`,
      `🔥 ${previousDaddy} couldn't hold it — ${newDaddy} is being crowned.`,
    ];
    return options[Math.floor(Math.random() * options.length)];
  },
  color: "#ffffff", // white Text
  bgColor: "#000000", // Black
  },


  isDaddy: {
  text: (username) => `${username.toUpperCase()} is ${getModelUsername()}'s new Daddy! 👑`,

  color: "#ffffff", // White Text
  bgColor: "#3EA308", // Green 
  },

prizeWon: {
  text: (username, prize) => {
    const options = [
      `💋 Mmmmm, ${username.toUpperCase()} You just earned: ${prize.toUpperCase()}. I hope you're ready for me 💄`,
      `💝 All yours, ${username.toUpperCase()}... You won the prize. Come claim your ${prize.toUpperCase()}`,
      `🎀 Well, well, well... ${username.toUpperCase()} You're my favorite Daddy! Your reward? ${prize.toUpperCase()} 😘`,
      `🎁 Congratulations, Daddy. ${prize.toUpperCase()} is all yours. I can't wait 😘💋`,
      `💎 ${username.toUpperCase()} You didn’t just tip... You dominated. ${prize.toUpperCase()} - Just for you Daddy.`,
      `🔥 That was hot ${username.toUpperCase()} Let's make it hotter. Your prize is: ${prize.toUpperCase()}`,
      `👑 ${username.toUpperCase()} you're not just Daddy - you're my King! Your prize awaits: ${prize.toUpperCase()} 💝`,
      `🥵 Oh my... You did it Daddy! ${prize.toUpperCase()} is yours, ${username.toUpperCase()}. I hope you're ready for it...`,
      `💌 That tip was everything Daddy! ${username.toUpperCase()}, you’ve earned: ${prize.toUpperCase()}`,
      `🎉 Prize alert! ${username.toUpperCase()}, you made it happen. Here’s Daddy's reward: ${prize.toUpperCase()}`
    ];
    return options[Math.floor(Math.random() * options.length)];
  },
  private: true,
  color: "#000000", // Black text
  bgColor: "#facc15", // Gold
},

    thankYouDaddy: {
    text: () => {
    const msgText = $settings.thank_You_Daddy 
    const tokens = $tip.tokens
    return `☁️ ${msgText} ☁️\n+ ${tokens} tokens`
    },

    color: `${THANK_YOU_TXT}`,  // Custom: Default is White
    bgColor: `${THANK_YOU_BG}`, // Custom: Default is Hot Pink
    private: true
  },
  announceCurrentDaddy: {
  text: () => {
    const daddy = getCurrentDaddy();
    const name = getModelUsername();
    return `👑 ${daddy.toUpperCase()} is ${name}'s Daddy. You must tip at least ${getDethroneCost()} total tokens during this session to take the crown.`;
  },
    color: `${ANNC_TXT}`, // Custom: Default is White
    bgColor: `${ANNC_BG}`, // Custom: Default is Royal Blue
  callback: true
},
tipToBecomeDaddy: {
  text: () => {
    const amount = DADDY_PRICE;
    const name = getModelUsername();
    return `👑 You must tip ${amount} tokens or more to become ${name}'s Daddy!`;
  },
    color: `${ANNC_TXT}`, // Custom: Default is White
    bgColor: `${ANNC_BG}`,
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
    leaderTitle: {
    text: `📈 Session Leaderboard - Type /leader`,
    color: "#ffffff", // White text
    bgColor: "#000000", // Green 
    },
    
    leaderTitleAllTime: {
  text: "🏆  All-Time Leaderboard - ⚡ Type /alltime",
  color: "#ffffff",
  bgColor: `${LEADER_BG}`,
},
    tipMenuTitle: {
      text: () => { 
      const TIP_MENU_GIF = $settings.menu_gif;  
      return  `       ${TIP_MENU_EMOJI} Tip Menu ${TIP_MENU_EMOJI} ${TIP_MENU_GIF}`;

      },
      color: `${TIP_MENU_TXT}`,
      bgColor: `${TIP_MENU_BG}`,
      
    },

    goalPrize: {
    text: `If you are the Daddy when the goal hits, you win a special prize. 💝 \n 🏆  Prize: ${PRIZE_LABEL}`,
    color: `${GOAL_PRIZE_TXT}`, // Custom: Default is white
    bgColor: `${GOAL_PRIZE_BG}`, // Custom: Default is Green
    },


    goalWon: {
    text: `🎯 Goal Reached! Goal is: ${GOAL_LABEL}`,
    color: "#ffffff", // White text
    bgColor: "#3ea308", // Green 
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


  // 🎯 Handle subject messages first (overrides all other types)
if (msg.type === 'subject') {
  const text = typeof msg.text === 'function' ? msg.text(...args) : msg.text;
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
  const text = typeof msg.text === 'function' ? msg.text(...args) : msg.text;

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
  $kv.remove('lastLeaderboardMode');
  $kv.remove('goalCurrent');
  $kv.set('goalCurrent', 0);
  $kv.set('goalMsgSent', false)
  $kv.set('sessionDaddy', 'None')
  $kv.set('sessionDaddyTotal', 0)

$callback.cancel('timerTick');
$kv.set('panelLockedForTimer', false);
$kv.remove('minutesLeft');
$kv.remove('timerLabel');
$kv.set('timerQueue', JSON.stringify([])); 

 



  // ✅ 4. Cancel any active crown-related callbacks
  sendMsg('appEnded'); 
  $callback.cancel('introDaddyPrompt');
  $callback.cancel('repeatDaddyAnnounce');
  $callback.cancel('revealCrown');
  $callback.cancel('revealNewDaddy');
  $callback.cancel('sessionLead');
  setDefaultPanel();
  $room.reloadPanel();
  
  
 


  // ⚠️ DO NOT clear All-Time leaderboard!
  // $kv.remove('AllTime_Tippers');  --> NOOOOOO!!!
}



