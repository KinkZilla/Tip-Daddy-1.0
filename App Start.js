   
    if ($settings.tip_menu === true) {
    let menu = [];

    try {
      menu = JSON.parse($kv.get('tipMenu') || '[]');
    } catch (e) {
      menu = [];
    }

    if (!Array.isArray(menu) || menu.length === 0) {
      sendMsg('tipMenuWelcome');
    } else {
      $callback.create('tipMenuAnnc', 60 * $settings.tip_menu_time, true);
      
    }
    }// end


  initializeAppSessionState(); 

     // 🧱 Prep all KV
sendMsg('appStarted');
 


 

// ✅ After all that, THEN create the introDaddyPrompt callback
if ($kv.get('crownUnlocked') !== 'true') {
  $callback.cancel('introDaddyPrompt');
  $callback.create('introDaddyPrompt', 60 * TIME_VAR, true); // 🔁 Loop reminder
}

