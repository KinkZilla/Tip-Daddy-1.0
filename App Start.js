// Calls the "onStart" function on app start.
onStart();

//Testing tip bar
$overlay.emit("goalUpdate", {
  current: $kv.get('goalCurrent'),
  value: $kv.get('goalValue')
});


