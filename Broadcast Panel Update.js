let currentAllTime = 'None - 0 tokens';
let goalCurrent = 0;
let goalValue = 0;
let currentDaddy = 'None';

try {
  currentAllTime = $kv.get('currentAllTime') || 'None - 0 tokens';
} catch (e) {
  currentAllTime = 'None - 0 tokens';
}

try {
  goalCurrent = Number($kv.get('goalCurrent') || 0);
} catch (e) {
  goalCurrent = 0;
}

try {
  goalValue = Number($kv.get('goalValue') || 0);
} catch (e) {
  goalValue = 0;
}

try {
  currentDaddy = $kv.get('currentDaddyIs') || 'None';
} catch (e) {
  currentDaddy = 'None';
}

const options = {
  template: '3_rows_of_labels',
  row1_label: 'Goal',
  row1_value: goalCurrent + ' of ' + goalValue,
  row2_label: "Current Daddy",
  row2_value: currentDaddy,
  row3_label: "All Time Daddy 🏆",
  row3_value: currentAllTime
};

$room.setPanelTemplate(options);
