// Temporary storage for crowning
let crownCandidateUsername = '';
let crownCandidateTokens = 0;


//-----------------------------------------------

if ($callback.label === 'suspenseAnimation') {
  updateSuspensePanel();
  $room.reloadPanel();
}


//-----------------------------------------------

if ($callback.label === 'introDaddyPrompt') {
  sendMsg('tipToBecomeDaddy');

} else if ($callback.label === 'repeatDaddyAnnounce') {
  sendMsg('announceCurrentDaddy');

} else if ($callback.label === 'revealCrown') {
  // 🔥 Officially crown the user after delayed suspense
  
  const crowningUsername = $kv.get('crownCandidateUsername') || 'None';
  const crowningTokens = Number($kv.get('crownCandidateTokens') || 0);

  if (crowningUsername !== 'None') {
    
// Here we finally set the Current Daddy Slot in the broadcast panel!

     $kv.set('sessionDaddy', crowningUsername); // Set them as Current Daddy in panel.
     $kv.set('sessionDaddyTotal', crowningTokens) // Set current Daddys Total in panel.
     sendMsg('firstDaddyCrowned', crowningUsername); // Announce them Daddy in Chat !
    $callback.cancel('repeatDaddyAnnounce');
    $callback.create('repeatDaddyAnnounce', 60 * TIME_VAR, true );
    
    
  }

  // CLEANUP 
  try { $kv.remove('crownCandidateUsername'); } catch (e) { // Dont store un-necessary keys bro!
  }
  try { $kv.remove('crownCandidateTokens'); } catch (e) { // Do you even code bro?
  }
  stopSuspenseLoop();
  $callback.cancel('revealCrown');

}

// Continuing where we left off ( Gotta keep up dude. This is Java in a CB Sandbox Environment )
// We're basically charting Martian territory right now. ↓

else if ($callback.label === 'revealNewDaddy') {

  // ↓ This is our spaceship from the crown transition function ↓

  const crowningUsername = $kv.get('new_Daddy') || 'None';
  const crowningTokens = Number($kv.get('new_Daddy_Tokens') || 0);
  
  // ↓ This should never be 'None' this far into the function, but we're being extra careful here 
  //   Weird edge cases, you know, like someone's username is 'None' 😂 (Sorry None lmao)

  if (crowningUsername !== 'None') {

    // ↓ Officialy set the New sessionDaddy, announce new daddy to the room, & update panel

   $kv.set('sessionDaddy', crowningUsername); // Set them as Current Daddy in panel.
   $kv.set('sessionDaddyTotal', crowningTokens) // Set current Daddys Total in panel.
   sendMsg('isDaddy', crowningUsername, crowningTokens); // Announce them Daddy in Chat !
   
   

  
  }
  
   // CLEANUP 
  try { $kv.remove('new_Daddy'); } catch (e) { // Dont store un-necessary keys bro!
  }
  try { $kv.remove('new_Daddy_Tokens'); } catch (e) { // Do you even code bro?
  }
  
  // End the callback so it's freed up for next time
  stopSuspenseLoop();
  $callback.cancel('revealNewDaddy');

  
}
