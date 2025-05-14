

const msg = $message.body.toLowerCase().trim();

// Set Tip Menu 

if ($message.body.includes('/help') && ($user.isMod || $user.username === $room.owner)) {
 sendMsg('helpMsg', $user.username);
}

if ($message.body.includes('/setmenu') && ($user.isMod || $user.username === $room.owner)) {
  if ($settings.tip_menu === true) {
    const args = $message.body.split(' ').slice(1); // Remove '/setmenu'

    if (args.length < 2) {
      sendMsg('invalidSetMenuUsage', $user.username);
    } else {
      const last = args[args.length - 1];
      const secondLast = args[args.length - 2];

      let price, timer, item;

      if (!isNaN(last) && !isNaN(secondLast)) {
        // Format: itemName price timer
        price = Number(secondLast);
        timer = Number(last);
        item = args.slice(0, -2).join(' ');
      } else if (!isNaN(last)) {
        // Format: itemName price
        price = Number(last);
        timer = null;
        item = args.slice(0, -1).join(' ');
      } else {
        sendMsg('invalidSetMenuUsage', $user.username);
        //do nothing
      }

      if (price <= 0 || (timer !== null && timer <= 0)) {
        sendMsg('invalidSetMenuUsage', $user.username);
      } else {
        updateTipMenu(item, price, $user.username, timer);
      }
    }
  }
}


// Remove Tip Menu Item command

if ($message.body.includes('/removeitem') && ($user.isMod || $user.username === $room.owner)) {
  if ($settings.tip_menu === true) {
    const itemToRemove = $message.body.split(' ').slice(1).join(' ').trim().toLowerCase();

    if (!itemToRemove) {
      sendMsg('invalidRemoveItemUsage', $user.username);
    } else {
      let menu = [];

      try {
        menu = JSON.parse($kv.get('tipMenu') || '[]');
        if (!Array.isArray(menu)) throw new Error();
      } catch (e) {
        menu = [];
      }

      const index = menu.findIndex(entry => entry.item.trim().toLowerCase() === itemToRemove);

      if (index === -1) {
        sendMsg('removeItemNotFound', $user.username, itemToRemove);
      } else {
        const removed = menu.splice(index, 1)[0];
        $kv.set('tipMenu', JSON.stringify(menu));
        sendMsg('removeItemSuccess', $user.username, removed.item);
      }
    }
  }
}

// Show Menu Command
if ($message.body.includes('/menu')) {
  if ($settings.tip_menu === true) {
    sendMsg('tipMenuTitle');
    let menu = [];

    try {
      menu = JSON.parse($kv.get('tipMenu') || '[]');
    } catch (e) {
      menu = [];
    }

    if (!Array.isArray(menu) || menu.length === 0) {
      sendMsg('emptyTipMenu');
    } else {
      let menuText = "";
      for (let entry of menu) {
        menuText += `🔹 ${entry.item} → ${entry.price} tokens\n`;
      }

      $room.sendNotice(menuText.trim(), {
        color: $settings.tipMenu_textColor,
        bgColor: $settings.tipMenu_bgColor,
      });
    }

  } else if ($user.isMod || $user.username === $room.owner) {
    sendMsg('tipMenuDisabled', $user.username);
  }
}



// Clear Tip Menu command
if ($message.body.includes('/clearmenu') && ($user.isMod || $user.username === $room.owner)) {
  if ($settings.tip_menu === true) {
    try {
      $kv.set('tipMenu', JSON.stringify([]));
      sendMsg('clearTipMenuSuccess', $user.username);
     
    } catch (e) {
      sendMsg('clearTipMenuError', $user.username);
    }
  }
}




// 📊 Show Session Leaderboard
if ($message.body.includes('/leader')) {
  sendMsg('leaderTitle');
  let sessionTippers = [];

  try {
    sessionTippers = JSON.parse($kv.get('Session_Tippers')) || [];
  } catch (e) {
    sessionTippers = [];
  }

  sessionTippers.sort((a, b) => b.tokens - a.tokens);

  let leaderboardText = "----- Top 5 ------\n";

  for (let i = 0; i < 5; i++) {
    if (sessionTippers[i]) {
      leaderboardText += `${sessionTippers[i].username}: ${sessionTippers[i].tokens} tokens\n`;
    } else {
      leaderboardText += "None — 0 tokens\n";
    }
  }

  $room.sendNotice(leaderboardText.trim(), {
      color: `${LEADER_TXT}`,
      bgColor: `${LEADER_BG}`,
  });
}

// 🏆 Show All-Time Leaderboard
if ($message.body.includes('/alltime')) {
  sendMsg('leaderTitleAllTime')
  let allTimeTippers = [];

  try {
    allTimeTippers = JSON.parse($kv.get('AllTime_Tippers')) || [];
  } catch (e) {
    allTimeTippers = [];
  }

  allTimeTippers.sort((a, b) => b.tokens - a.tokens);

  let leaderboardText = "------ Top 5 ------\n";

  for (let i = 0; i < 5; i++) {
    if (allTimeTippers[i]) {
      leaderboardText += `${allTimeTippers[i].username}: ${allTimeTippers[i].tokens} tokens\n`;
    } else {
      leaderboardText += "None — 0 tokens\n";
    }
  }

    $room.sendNotice(leaderboardText.trim(), {
      color: `${LEADER_TXT}`,
      bgColor: `${LEADER_BG}`,
  });
}


if ($message.body.includes('/setalltime') && ($user.isMod || $user.username === $room.owner)) {
  const parts = $message.body.split(' ');

   if (!$kv.get('panelLocked')) {
  
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
  $kv.set('currentAllTime', topUser.username);
  $kv.set('currentAllTimeTotal', topUser.tokens);

} else {
  $kv.set('currentAllTime', 'None - 0 tokens');
}

// ✅ Always refresh the panel once, after all keys are set
setDefaultPanel();
$room.reloadPanel();

      sendMsg('setAllTimeSuccess', $user.username, targetUsername, targetTokens);
      }
    }
  }else {
    sendMsg('clearAllTimeInvalid');
  }
}

// 🧹 /clearalltime command 
if ($message.body.includes('/clearalltime') && ($user.isMod || $user.username === $room.owner)) {
  
  if (!$kv.get('panelLocked')) {

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
}else {
  sendMsg('clearAllTimeInvalid', $user.username);
}
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

