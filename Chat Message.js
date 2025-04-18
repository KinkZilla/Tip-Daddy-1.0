// Show Session Leaderboard
if ($message.body.toLowerCase().includes('/leader')) {
  showLeaderboard('Session');
}

// Show All-Time Leaderboard
if ($message.body.toLowerCase().includes('/alltime')) {
  showLeaderboard('AllTime');
}


// Manually set an All-Time Leader via admin command
if ($message.body.startsWith('/setalltime') && ($user.isMod || $user.username === $room.owner)) {


  const parts = $message.body.trim().split(/\s+/);
  if (parts.length === 3) {
    const targetName = parts[1];
    const tokens = parseInt(parts[2]);

    if (!isNaN(tokens)) {
      $kv.set(`AllTime_TopTipper_${targetName}`, tokens);

      let topList = [];
      try {
        topList = JSON.parse($kv.get('AllTime_TopTippers')) || [];
      } catch (e) {
        topList = [];
      }

      if (!topList.includes(targetName)) {
        topList.push(targetName);
      }

      // Re-sort and trim to top 5
      topList.sort((a, b) => {
        const aTotal = Number($kv.get(`AllTime_TopTipper_${a}`) || 0);
        const bTotal = Number($kv.get(`AllTime_TopTipper_${b}`) || 0);
        return bTotal - aTotal;
      });

      $kv.set('AllTime_TopTippers', JSON.stringify(topList.slice(0, 5)));

      $room.sendNotice(`✅ Set ${targetName} to ${tokens} tokens on the All-Time leaderboard.`);
    $room.reloadPanel()
 
 updateTopTippers('AllTime', {targetName}, {tokens});  // lives forever


    } else {
      $room.sendNotice(`⚠️ Invalid token amount. Use: /setalltime username tokens`);
    }
  } else {
    $room.sendNotice(`⚠️ Incorrect format. Use: /setalltime username tokens`);
  }
}

if ($message.body === '/clearalltime' && ($user.isMod || $user.username === $room.owner)) {
  let topList = [];
  try {
    topList = JSON.parse($kv.get('AllTime_TopTippers')) || [];
  } catch (e) {
    topList = [];
  }

  for (let i = 0; i < topList.length; i++) {
    const name = topList[i];
    $kv.remove(`AllTime_TopTipper_${name}`);
  }

  $kv.set('AllTime_TopTippers', JSON.stringify([]));
  $kv.set('HighestGoalTipperName', 'None')
  $kv.set('currentAllTime', 'None - 0 Tokens')
  $room.reloadPanel()
  $room.sendNotice('🧹 All-Time leaderboard has been cleared.', { toUsername: $user.username });
 
}
