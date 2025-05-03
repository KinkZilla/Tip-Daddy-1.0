const row1 = $kv.get('panel_row1_value') || '';
const row2 = $kv.get('panel_row2_value') || '';
const row3 = $kv.get('panel_row3_value') || '';

$room.setPanelTemplate({
  template: '3_rows_of_labels',
  row1_label: 'Received / Goal',
  row1_value: row1,
  row2_label: 'Current Daddy',
  row2_value: row2,
  row3_label: 'All Time Daddy 🏆',
  row3_value: row3
});
