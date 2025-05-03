try {
  if ($user.username == $kv.get('sessionDaddy')) {
    $message.setBody($settings.daddy_icon + ' ' +  $message.body);
    $message.setBgColor($settings.daddy_background);
  }
} catch (e) {
  // Do nothing if the key doesn't exist — silently skip transform
}
