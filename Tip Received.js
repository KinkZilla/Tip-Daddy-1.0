$kv.incr('goalCurrent', $tip.tokens);
updateSubject();
$room.reloadPanel();
updateTopTippers('Session', $user.username, $tip.tokens);  // gets wiped
updateTopTippers('AllTime', $user.username, $tip.tokens);  // lives forever

let topName = 'None';
let currentHigh = 0;

try {
  topName = $kv.get('HighestGoalTipperName') || 'None';
} catch (e) {
  topName = 'None';
}

try {
  currentHigh = Number($kv.get('HighestGoalTipperAmount') || 0);
} catch (e) {
  currentHigh = 0;
}

if ($user.username === topName) {
  // They’re already the top tipper — just add to their total
  try {
    $kv.incr('HighestGoalTipperAmount', $tip.tokens);
  } catch (e) {
    $kv.set('HighestGoalTipperAmount', $tip.tokens); // fallback safety
  }

} else {
  // They’re not the top — check if this tip puts them in the lead
  const newTotal = $tip.tokens; // If you ever track running total per-user, adjust here

  if (newTotal > currentHigh) {
    $kv.set('HighestGoalTipperAmount', newTotal);
    $kv.set('HighestGoalTipperName', $user.username);
  }
}

goalPrizeMsg();

// added to test tip bar
startIntroCallback();
