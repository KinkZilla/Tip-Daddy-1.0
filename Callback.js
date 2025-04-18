if ($callback.label === 'SessionLeaderAnnounce') {
  broadcastSessionLeaderboard();
} else {
  if ($callback.label === 'Intro') {
    tipToStartCallback();
  } else if ($callback.label === 'Main') {
    $callback.cancel('Intro');
    sendDaddyNoticeTo();
  
  } else if ($callback.label === 'PrizeNotice') {
    $callback.cancel('Main');
    $callback.cancel('Intro');

    firePrizeNotice();
  }
}
