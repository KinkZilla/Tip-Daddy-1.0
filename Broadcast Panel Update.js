let currentAllTime;
try {
  currentAllTime = $kv.get('currentAllTime') || 'None - 0 tokens';
} catch (e) {
  currentAllTime = 'None - 0 tokens';
}


const options = {
  template: '3_rows_of_labels',
  row1_label: 'Goal',
  row1_value: $kv.get('goalCurrent') + ' of ' + $kv.get('goalValue'),
  row2_label: "Current Daddy",
  row2_value: $kv.get('currentDaddyIs'),
  row3_label: "All Time Daddy 🏆",
  row3_value: currentAllTime
}




$room.setPanelTemplate(options)