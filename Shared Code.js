/**
 * App: WhosYourDaddy- Top Tipper
 * Version: 1.0.1
 * Author: Kink_Zilla 
 * Date: 2025-04-11
 * Credit: This app is an upgrade of Erikas Daddy Tipper by gates_
 */




const end_line = '\u00A0';

function announceAppStarted(){
  $room.sendNotice($app.name + ' has started. You\'re running Version 1.0.1');
}

function announceAppStopped(){
  $room.sendNotice($app.name + ' has stopped.');
}

function setUsernameDefault(){
if ($settings.use_default_username === false){
  $kv.set('userNameIs', $settings.alt_username);
} else {
  $kv.set('userNameIs', $room.owner);
}

}

function onStart() {
 
  announceAppStarted();
  setUsernameDefault();
  $room.reloadPanel()
  init_Goal_Begin();
  startIntroCallback();


}



function sendStyledNotice(message, username = null) {
  $room.sendNotice(message, {
    toUsername: username,
    color: $settings.background_color,
    bgColor: $settings.text_color
  });
}

function showLeaderboard(scope, targetUser) {
  let topList = [];
  try {
    topList = JSON.parse($kv.get(`${scope}_TopTippers`)) || [];
  } catch (e) {
    topList = [];
  }

  const lines = [];
  lines.push(`* ${scope === 'AllTime' ? 'All-Time' : 'This Session'} *`);
  lines.push(`----- Top 5 ------`);

  for (let i = 0; i < 5; i++) {
    const name = topList[i];
    if (name) {
      const total = Number($kv.get(`${scope}_TopTipper_${name}`) || 0);
      lines.push(`${name}: ${total} tokens`);
    } else {
      lines.push(`None — 0 tokens`);
    }
  }

  const message = lines.join('\n');
  $room.sendNotice(message, { toUsername: targetUser });
}

function cancelAllCallbacks() {
    $callback.cancel('Intro')
    $callback.cancel('Main')
    $callback.cancel('SessionLeaderAnnounce')
}

function tipToStartCallback(username){
  let message = 'You must tip at least ' + $settings.init_Tip_Value + ' tokens to become ' + $kv.get('userNameIs') + '\'s Daddy.'
  sendStyledNotice(message, username);
}

function broadcastSessionLeaderboard(username) {
let message = '👑 Top 5 Leaders for this Session 👑'

 $room.sendNotice(message, {toUsername : username, color : $settings.session_leader_text, bgColor : $settings.session_leader_bg})

  showLeaderboard('Session');
}


function init_Goal_Begin() {
  let alreadyInit = false;

  try {
    alreadyInit = $kv.get('goalInitialized') === 'true';
  } catch (e) {
    alreadyInit = false;
  }

  if (!alreadyInit) {
    $kv.set('roomSubject', $settings._Goal);
    $kv.set('goalValue', $settings.goal_Value);
    $kv.set('goalCurrent', 0);
    $kv.set('HighestGoalTipperAmount', 0);
    $kv.set('HighestGoalTipperName', 'None');
    $kv.set('currentDaddyIs', 'None');
    $kv.set('TopTippers', 'None');
    $kv.set('goalInitialized', 'true'); // must be a string, not boolean!
  }

  updateSubject();
  $callback.create('SessionLeaderAnnounce', 60 * $settings.time_session_leader, true);
}


function updateSubject() {
  let current = 0;
  let value = 0;
  let subject = 'Goal';

  try {
    current = Number($kv.get('goalCurrent') || 0);
  } catch (e) {
    current = 0;
  }

  try {
    value = Number($kv.get('goalValue') || 0);
  } catch (e) {
    value = 0;
  }

  try {
    subject = $kv.get('roomSubject') || 'Goal';
  } catch (e) {
    subject = 'Goal';
  }

  $room.setSubject(`${subject} @ Goal: ${current} of ${value} tokens.`);
}


function setDaddyCurrent() {
  $kv.set('currentDaddyIs', $kv.get('HighestGoalTipperName') || 'None')
}

function startIntroCallback() {
  let amount = 0;
  let current = 0;
  let goal = 0;

  try {
    amount = Number($kv.get('HighestGoalTipperAmount') || 0);
  } catch (e) {
    amount = 0;
  }

  try {
    current = Number($kv.get('goalCurrent') || 0);
  } catch (e) {
    current = 0;
  }

  try {
    goal = Number($settings.goal_Value || 0);
  } catch (e) {
    goal = 0;
  }

  const Tips = ($settings.init_Tip_Value - 1);

  if (current >= goal) {
    // 🛑 Goal already reached, do NOT run 'Main' again
     // ✅ Goal already reached — do NOT run 'Main' again, quietly set Daddy, skip repeat announcements
     
  setDaddyCurrent();
    return;
  }

  if (amount > Tips) {
    $callback.cancel('Intro');
    setDaddyCurrent();
    sendDaddyNoticeTo();
    $callback.create('Main', 60 * $settings.time_step, true);
  } else {
    $callback.create('Intro', 60 * $settings.time_step, true);
  }
}






function updateTopTippers(type, username, tokens) {
  const keyPrefix = `${type}_TopTipper_`;
  const listKey = `${type}_TopTippers`;
  const userKey = `${keyPrefix}${username}`;

  // Safely get the current total
  let currentTotal = 0;
  try {
    currentTotal = Number($kv.get(userKey));
  } catch (e) {
    currentTotal = 0;
  }

  const newTotal = currentTotal + tokens;
  $kv.set(userKey, newTotal);

  // Safely parse the leaderboard
  let topList = [];
  try {
    topList = JSON.parse($kv.get(listKey)) || [];
  } catch (e) {
    topList = [];
  }

  if (!topList.includes(username)) {
    topList.push(username);
  }

  topList = topList.filter(name => typeof name === 'string');
  topList.sort((a, b) => {
    let aTotal = 0;
    let bTotal = 0;
    try {
      aTotal = Number($kv.get(`${keyPrefix}${a}`));
    } catch (e) {
      aTotal = 0;
    }
    try {
      bTotal = Number($kv.get(`${keyPrefix}${b}`));
    } catch (e) {
      bTotal = 0;
    }
    return bTotal - aTotal;
  });

  topList = topList.slice(0, 5);
  $kv.set(listKey, JSON.stringify(topList));

  // NEW: Set the current all-time top tipper if we're working with AllTime scope
  if (type === 'AllTime' && topList.length > 0) {
    const topUser = topList[0];
    let topTokens = 0;
    try {
      topTokens = Number($kv.get(`${keyPrefix}${topUser}`));
    } catch (e) {
      topTokens = 0;
    }
    // Update the currentAllTime key with combined info
    $kv.set('currentAllTime', `${topUser} - ${topTokens} tokens`);
  }
}





function firePrizeNotice() {
  const daddy = $kv.get('HighestGoalTipperName') || 'None';
  const tokens = $kv.get('HighestGoalTipperAmount') || 0;
  const prize = $settings.goal_Prize || 'a mystery treat 👀';
  const msg = `🎉 Congratulations ${daddy}! You’ve won the goal prize as the Top Daddy with ${tokens} tokens tipped!\n💝 Prize: ✨${prize}✨`;

    $room.sendNotice(msg, {
      color: '#ffffff',
      bgColor: '#000000'
    });

}

function sendDaddyNotice(){
  sendDaddyNoticeTo()
}

// When someone becomes Daddy, send a notice to announce it to the room. 
function sendDaddyNoticeTo(username){
  var record = $kv.get('HighestGoalTipperAmount') + 1;
  let message = $kv.get('HighestGoalTipperName') + ' is ' + $kv.get('userNameIs') + '\'s Daddy with ' + $kv.get('HighestGoalTipperAmount') + ' tokens tipped.' + end_line
  + '\n Tip at least ' + record + ' tokens to become the NEW Daddy. ' + end_line
  if ($settings.prize_enable === true) {
    message += '\n Top Daddy takes the prize when the goal is reached!😏 Today’s reward is: ' + $settings.goal_Prize
  }
  sendStyledNotice(message, username);
}

//send Daddy a message when he wins the goal prize.
//also send Daddy a PM.
function goalPrizeMsg() {
  const current = Number($kv.get('goalCurrent') || 0);
  const goal = Number($kv.get('goalValue') || 0);

  if (current >= goal && $settings.prize_enable === true) {
    const topDaddy = $kv.get('HighestGoalTipperName') || null;
    const prize = $settings.goal_Prize || 'a mystery treat 👀';

    if (topDaddy && topDaddy !== 'None') {
      
      $callback.create('PrizeNotice', 2, false);
      const msg = `🎉 You crushed it, ${topDaddy}!\nYou've earned the prize for completing the goal!\n\n💝 Your prize is: ${prize}`;

      $room.sendNotice(msg, {
        toUsername: topDaddy,
        color: '#ffffff',       // White text
        bgColor: '#000000'      // Black background
      });
    }
  }
}





// This should run when the app stops
function onStop() {
  let topListRaw = '';
  try {
    topListRaw = $kv.get('Session_TopTippers');
  } catch (e) {
    topListRaw = '[]';
  }

  let topList = [];
  try {
    topList = JSON.parse(topListRaw);
    if (!Array.isArray(topList)) throw new Error();
  } catch (e) {
    topList = [];
  }

  for (const name of topList) {
    $kv.remove(`Session_TopTipper_${name}`);
  }

  try {
    $kv.remove('Session_TopTippers');
  } catch (e) {
    // Key might not exist — ignore
  }
  announceAppStopped();
$kv.remove('HighestGoalTipperAmount')
$kv.remove('HighestGoalTipperName')
$kv.remove('goalCurrent')
$kv.remove('currentDaddyIs')
  cancelAllCallbacks();

}

