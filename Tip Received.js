$kv.incr('goalCurrent', $tip.tokens)
// ✅ check if the goal was hit *before* updating the subject
// Pass the tip so it evaluates the new total correctly

updateSubject();
$room.reloadPanel()
updateTopTippers('Session', $user.username, $tip.tokens);  // gets wiped
updateTopTippers('AllTime', $user.username, $tip.tokens);  // lives forever

if ($user.username === $kv.get('HighestGoalTipperName')) {
  // They’re already the top tipper — just add to their total
  $kv.incr('HighestGoalTipperAmount', $tip.tokens);

} else {
  // They’re not the top — check if this tip puts them in the lead
  const currentHigh = Number($kv.get('HighestGoalTipperAmount') || 0);
  const newTotal = $tip.tokens; // Assuming you're not tracking their full total

  if (newTotal > currentHigh) {
    $kv.set('HighestGoalTipperAmount', newTotal);
    $kv.set('HighestGoalTipperName', $user.username);
  }
}

startIntroCallback();
goalPrizeMsg();

