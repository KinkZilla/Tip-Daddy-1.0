if ($kv.get('appSessionInitialized') === false) {
  initializeAppSessionState(); 
}
     // 🧱 Prep all KV
sendMsg('appStarted');
// ✅ After all that, THEN create the introDaddyPrompt callback
if ($kv.get('crownUnlocked') !== 'true') {
  $callback.cancel('introDaddyPrompt');
  $callback.create('introDaddyPrompt', 60 * TIME_VAR, true); // 🔁 Loop reminder
}

