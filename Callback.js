

if ($callback.label === 'SessionLeaderAnnounce') {
  broadcastSessionLeaderboard();
}

if ($callback.label === 'Main'){
  $callback.cancel('Intro')
  sendDaddyNoticeTo();
}

if ($callback.label === 'Intro') {
  tipToStartCallback();
}
