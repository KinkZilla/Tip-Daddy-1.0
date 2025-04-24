
/**
 * Tip Daddy
 * Version: 1.0.4
 * Author: kink_zilla
 *
 * Comments:
 * If you branch Tip Daddy, you should reference the original GitHub.
 * Please dont publish your versions like they're official—
 * label your remix like "Tip Daddy - Remixed" or something cool 👌👍
 */



// 🧠 Tip Daddy Constants & Runtime Lock-In

const APP_NAME = "Tip Daddy 1.0";
const APP_VERSION = "1.0.4";

$app.name = APP_NAME;
$app.version = APP_VERSION;



// ----------------------------------------
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
//  ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓  USER DEFINED CONSTANTS   ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓


const DEFAULT_NAME = $settings.use_default_username; 
const USER_NAME = $settings.alt_username;  // Name you want to replace it with.
const GOAL_LABEL = $settings.goal; // What are we tipping for? Sexy Dance?
const GOAL_AMOUNT = $settings.goal_Value; // How much is the goal? In tokens.
const PRIZE_ON = $settings.prize_enable;
const PRIZE_LABEL = $settings.goal_Prize;
const DADDY_PRICE = $settings.init_Tip_Value; 
const DADDY_EMOJI = $settings.daddy_icon;
const DADDY_COLOR = $settings.daddy_background;
const TIME_VAR = $settings.time_value; 
const MSG_TXT = $settings.text_color; 
const MSG_BG = $settings.background_color; 
const LEADER_BG = $settings.session_leader_bg; 
const LEADER_TXT = $settings.session_leader_text; 
const SESSION_TIME_VAR = $settings.time_session_leader;

//-------------------------------------------------------------------------------------- 
//                           ↓ INITIALIZATION FUNCTIONS
//--------------------------------------------------------------------------------------
//
//         🧠 INIT GOAL: Safe one-time goal setup logic
//         Initialize the settings, but only if they have not been set before.
//              ↓ Protects against hiccups.
// 
// -------------------------------------------
// This function runs once when the app starts to initialize all goal-related KV values.


//Checks if settings have been initialized or not, if they havent it sets all values.
//
function init_Goal_Begin() {
  let alreadyInit = false;

  try {
    alreadyInit = $kv.get('goalInitialized') === 'true';
  } catch (e) {
    alreadyInit = false;
  }

  if (!alreadyInit) {
    $kv.set('roomSubject', GOAL_LABEL);
    $kv.set('goalValue', GOAL_AMOUNT);
    $kv.set('goalCurrent', 0);
    $kv.set('HighestGoalTipperAmount', 0);
    $kv.set('HighestGoalTipperName', 'None');
    $kv.set('currentDaddyIs', 'None');
    $kv.set('TopTippers', 'None');
    $kv.set('goalInitialized', 'true'); // still a string, to avoid weirdness
  }
}



//-------------------------------------------------------------------------------------- 
//                           ↓ HELPER FUNCTIONS
//--------------------------------------------------------------------------------------
/**
 * 🔑 Crown Unlock Checker
 * Returns true if the crown system has been activated for this session.
 * Once a user tips at least init_Tip_Value, the crown becomes eligible for announcements.
 */
function isCrownUnlocked() {
  return $kv.get('crownUnlocked') === 'true';
}
//--------------------------------------------------------------------------------------

// This helper is crucial for keeping track of current Daddy
/**
 * 👑 getCurrentDaddy()
 * Returns the current top tipper for this session — the live crown holder.
 * Pulls from Session_AllTippers and sorts by token totals.
 */
function getCurrentDaddy() {
  try {
    const userList = JSON.parse($kv.get('Session_AllTippers')) || [];

    return userList
      .filter(name => typeof name === 'string')
      .sort((a, b) => {
        const aTotal = Number($kv.get(`Session_TopTipper_${a}`)) || 0;
        const bTotal = Number($kv.get(`Session_TopTipper_${b}`)) || 0;
        return bTotal - aTotal;
      })[0] || 'None';
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
  const currentDaddy = getCurrentDaddy();
  return Number($kv.get(`Session_TopTipper_${currentDaddy}`)) || 0;
}


//✅ Returns a formatted string
//🧠 Use it anywhere you need to drop a leaderboard (public message, overlay, PM, etc.)
// This is not the Leaderboard Logic, this is to build a leaderboard for Chat.

function buildLeaderboard(scope = 'Session') {
  const isSession = scope === 'Session';
  const listKey = isSession ? 'Session_AllTippers' : 'AllTime_TopTippers';
  let userList = [];

  try {
    userList = JSON.parse($kv.get(listKey)) || [];
  } catch (e) {
    userList = [];
  }

  const lines = [];
  lines.push(`* ${isSession ? 'This Session' : 'All-Time'} *`);
  lines.push(`----- Top 5 ------`);

  // Build the leaderboard from totals
  const sortedList = userList
    .filter(name => typeof name === 'string')
    .sort((a, b) => {
      const aTotal = Number($kv.get(`${scope}_TopTipper_${a}`)) || 0;
      const bTotal = Number($kv.get(`${scope}_TopTipper_${b}`)) || 0;
      return bTotal - aTotal;
    })
    .slice(0, 5);

  for (const name of sortedList) {
    const total = Number($kv.get(`${scope}_TopTipper_${name}`)) || 0;
    lines.push(`${name}: ${total} tokens`);
  }

  // Fill in blank spots if needed
  while (lines.length < 7) {
    lines.push(`None — 0 tokens`);
  }

  return lines.join('\n');
}




//-------------------------------------------------------------------------------------
// ↓ 🧠 CORE LOGIC FUNCTIONS
//-------------------------------------------------------------------------------------
//
// 🧠 This is the Leaderboard Logic ↓

// Called every time someone tips.
// Updates the user's session total and all-time record (if beaten).
// Maintains a list of all session tippers and re-sorts the All-Time leaderboard.
// Session leaderboard is built on-demand using buildLeaderboard('Session')(SEE ↑)
//--------------------------------------------------------------------------------------

function updateLeaderboardState(username, tokens) {
  const sessionTipKey = `Session_TopTipper_${username}`;
  const allTimeTipKey = `AllTime_TopTipper_${username}`;

  // STEP 1: Update session tip total
  let sessionTotal = 0;
  try {
    sessionTotal = Number($kv.get(sessionTipKey)) || 0;
  } catch (e) {
    sessionTotal = 0;
  }

  const newSessionTotal = sessionTotal + tokens;
  $kv.set(sessionTipKey, newSessionTotal);

  // STEP 2: Add user to Session_AllTippers (if not already there)
  let allTippers = [];
  try {
    allTippers = JSON.parse($kv.get('Session_AllTippers')) || [];
  } catch (e) {
    allTippers = [];
  }

  if (!allTippers.includes(username)) {
    allTippers.push(username);
    $kv.set('Session_AllTippers', JSON.stringify(allTippers));
  }

  // STEP 3: Check if user beat their all-time best
  let previousBest = 0;
  try {
    previousBest = Number($kv.get(allTimeTipKey)) || 0;
  } catch (e) {
    previousBest = 0;
  }

  if (newSessionTotal > previousBest) {
    // Update their personal all-time best
    $kv.set(allTimeTipKey, newSessionTotal);
  }

  // STEP 4: Rebuild and re-rank AllTime_TopTippers
  let allTimeList = [];
  try {
    allTimeList = JSON.parse($kv.get('AllTime_TopTippers')) || [];
  } catch (e) {
    allTimeList = [];
  }

  if (!allTimeList.includes(username)) {
    allTimeList.push(username);
  }

  // Clean and sort by all-time record (not session!)
  allTimeList = allTimeList
    .filter(name => typeof name === 'string')
    .sort((a, b) => {
      const aBest = Number($kv.get(`AllTime_TopTipper_${a}`)) || 0;
      const bBest = Number($kv.get(`AllTime_TopTipper_${b}`)) || 0;
      return bBest - aBest;
    })
    .slice(0, 5);

  $kv.set('AllTime_TopTippers', JSON.stringify(allTimeList));

  // STEP 5: Update pretty broadcast panel label for top All-Time Daddy
  const topAllTime = allTimeList[0] || 'None';
  const topScore = Number($kv.get(`AllTime_TopTipper_${topAllTime}`)) || 0;
  $kv.set('currentAllTime', `${topAllTime} - ${topScore} tokens`);
}

//--------------------------------------------------------------------------
//
//                     CORE CROWN/DETHRONE LOGIC
//
//-------------------------------------------------------------------------
/**
 * 💼 CORE LOGIC: Evaluates crown status for a user
 * - Compares a user's total to the current session leader
 * - Determines dethrone eligibility
 * - Returns dethrone info for use in logic or messages
 *
 * @param {string} username - The challenger
 * @returns {{
 *   currentDaddy: string,
 *   challengerTotal: number,
 *   daddyTotal: number,
 *   dethroneCost: number,
 *   remaining: number
 * }}
 */
function evaluateCrownStatus(username) {
  let currentDaddy = 'None';
  let daddyTotal = 0;
  let challengerTotal = 0;

  try {
    const sessionList = JSON.parse($kv.get('Session_AllTippers')) || [];
    currentDaddy = sessionList[0] || 'None';
  } catch (e) {
    currentDaddy = 'None';
  }

  // Get the current Daddy's total
  try {
    daddyTotal = Number($kv.get(`Session_TopTipper_${currentDaddy}`)) || 0;
  } catch (e) {
    daddyTotal = 0;
  }

  // Get the challenger’s total
  try {
    challengerTotal = Number($kv.get(`Session_TopTipper_${username}`)) || 0;
  } catch (e) {
    challengerTotal = 0;
  }

  const dethroneCost = daddyTotal + 1;
  const remaining = dethroneCost - challengerTotal;

  return {
    currentDaddy,
    challengerTotal,
    daddyTotal,
    dethroneCost,
    remaining
  };
}



//---------------------------------------------------------------------------
//
//                          APP MESSAGE LOGIC ↓
// All app messages are controlled (for the most part) by the following code.
//---------------------------------------------------------------------------- 

//Unicode Map for bolded messages/usernames
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
  // Separated by a comma, this is our List of App Messages.
   
   
   
   //System Messages / Error Reporting

    unknownMsgKey: { // Message Key is unknown.
    text: "❓ Unknown message key: key",
    color: "#ffffff",
    bgColor: "#4f46e5"
  },
    wrongFormatSetAllTime: { // Wrong format for /setalltime command.
    text: "⚠️ Incorrect format. Use: /setalltime username tokens.",
    color: "#ffffff",
    bgColor: "#4f46e5"
  },
   //Game Messages / Daddy Messages
    closeCall: { // User is really close to the lead. .
    text: "`😱 ${toUnicodeBold(user)} is just ${tokensNeeded} tokens away from stealing the crown!`",
    color: "#ffffff",
    bgColor: "#4f46e5"
  },
    crownDaddy: { // Daddy has been crowned.
    text: "User 'username' is the Daddy with 'amount' tokens tipped.",
    color: "#ffffff",
    bgColor: "#4f46e5"
  },
   deThronedDaddy: { // Daddy has been de-throned.
    text: "User 'previousDaddy' was De-throned by 'New Daddy' The crown has been stolen.",
    color: "#ffffff",
    bgColor: "#4f46e5"
  },
  isDaddy: { // Show this message whenever someone becomes the Daddy
    text: "This username is the new Daddy!",
    color: "#ffffff",
    bgColor: "#4f46e5"
  },
  prizeWon: { // The Daddy Prize message is defined in $settings.goal_Prize
    text: "Daddy won the prize!",
    color: "#ffffff",
    bgColor: "#4f46e5",
    callback: true
  },
  goalWon: { // Goal complete!
    text: "🎯 Goal complete!",
    color: "#000000",
    bgColor: "#facc15"
  }
};

//-----------------------------------------------------------------------------------

// Below is the sendMsg Function. 
//It is designed to handle / route all of the messages for the app.

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
    return; // Skip chat message
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
    $callback.create('msg_' + key, msg.delay, false, sendNow);
  } else {
    sendNow();
  }
}

// 👀 Utility: Check if a message is eligible to be used by a callback loop
sendMsg.isCallbackEnabled = (key) => {
 return messageList[key] && messageList[key].callback === true;

};


//--------------------- END OF MESSAGES SECTION --------------------


