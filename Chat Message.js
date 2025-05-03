

const msg = $message.body.toLowerCase().trim();

// 📊 Show Session Leaderboard
if (msg === '/leader') {
  let sessionTippers = [];

  try {
    sessionTippers = JSON.parse($kv.get('Session_Tippers')) || [];
  } catch (e) {
    sessionTippers = [];
  }

  sessionTippers.sort((a, b) => b.tokens - a.tokens);

  let leaderboardText = "📊 * This Session *\n----- Top 5 ------\n";

  for (let i = 0; i < 5; i++) {
    if (sessionTippers[i]) {
      leaderboardText += `${sessionTippers[i].username}: ${sessionTippers[i].tokens} tokens\n`;
    } else {
      leaderboardText += "None — 0 tokens\n";
    }
  }

  $room.sendNotice(leaderboardText.trim());
}

// 🏆 Show All-Time Leaderboard
if (msg === '/alltime') {
  let allTimeTippers = [];

  try {
    allTimeTippers = JSON.parse($kv.get('AllTime_Tippers')) || [];
  } catch (e) {
    allTimeTippers = [];
  }

  allTimeTippers.sort((a, b) => b.tokens - a.tokens);

  let leaderboardText = "📊 * All-Time *\n----- Top 5 ------\n";

  for (let i = 0; i < 5; i++) {
    if (allTimeTippers[i]) {
      leaderboardText += `${allTimeTippers[i].username}: ${allTimeTippers[i].tokens} tokens\n`;
    } else {
      leaderboardText += "None — 0 tokens\n";
    }
  }

  $room.sendNotice(leaderboardText.trim());
}


if ($message.body.startsWith('/setalltime') && ($user.isMod || $user.username === $room.owner)) {
  const parts = $message.body.split(' ');

  if (parts.length !== 3) {
    // ❗ Wrong format
    sendMsg('setAllTimeFormatError', $user.username);
  } else {
    const targetUsername = parts[1];
    const targetTokens = Number(parts[2]);

    if (isNaN(targetTokens) || targetTokens < 1) {
      // ❗ Invalid token amount
      sendMsg('setAllTimeInvalid', $user.username);
    } else {
      // ✅ Normal setting code if everything is valid

      let allTimeTippers = [];
      try {
        allTimeTippers = JSON.parse($kv.get('AllTime_Tippers')) || [];
      } catch (e) {
        allTimeTippers = [];
      }

      const existingEntry = allTimeTippers.find(entry => entry.username === targetUsername);

      if (existingEntry) {
        existingEntry.tokens = targetTokens;
      } else {
        allTimeTippers.push({ username: targetUsername, tokens: targetTokens });
      }

      allTimeTippers.sort((a, b) => b.tokens - a.tokens);
      allTimeTippers = allTimeTippers.slice(0, 5);

      $kv.set('AllTime_Tippers', JSON.stringify(allTimeTippers));

      if (allTimeTippers.length > 0) {
        const topUser = allTimeTippers[0];
        $kv.set('currentAllTime', `${topUser.username} - ${topUser.tokens} tokens`);
      } else {
        $kv.set('currentAllTime', 'None - 0 tokens');
      }

      setDefaultPanel();
      $room.reloadPanel();

      sendMsg('setAllTimeSuccess', $user.username, targetUsername, targetTokens);
    }
  }
}

// 🧹 /clearalltime command 
if ($message.body.startsWith('/clearalltime') && ($user.isMod || $user.username === $room.owner)) {
  try {
    $kv.set('AllTime_Tippers', JSON.stringify([])); // Clear the full all-time leaderboard
  } catch (e) {
    console.log('Failed to clear AllTime_Tippers array.');
  }

  try {
    $kv.set('currentAllTime', 'None'); // Reset display string
    Number($kv.set('currentAllTimeTotal', 0));
  } catch (e) {
    console.log('Failed to reset currentAllTime.');
  }

  setDefaultPanel(); // Rebuild panel to reflect cleared values
  $room.reloadPanel(); // Push live to viewers

  sendMsg('clearAllTimeSuccess', $user.username); // ✅ Confirmation message
}


// ♻️  RESET APP COMMAND

if ((msg === '/restart') && ($user.isMod || $user.username === $room.owner)) {
  performFullReset();
  $room.reloadPanel();
}


// ☢️  WIPE ALL MEMORY / THEN RESET

if ((msg === '/###1') && ($user.isMod || $user.username === $room.owner)) {
  clearAll();
  performFullReset();
  $room.reloadPanel();
}

