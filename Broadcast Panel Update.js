let row1_label = '';
let row1 = '';
let row2_label = '';
let row2 = '';
let row3_label = '';
let row3 = '';

try { row1_label = $kv.get('row1_label_value') || ''; } catch (e) {
console.log('Failed to get row1_label_value');
}
try { row1 = $kv.get('panel_row1_value') || ''; } catch (e) {
console.log('Failed to get panel_row1_value');
}

try { row2_label = $kv.get('row2_label_value') || ''; } catch (e) {
console.log('Failed to get row2_label_value');
}
try { row2 = $kv.get('panel_row2_value') || ''; } catch (e) {
console.log('Failed to get panel_row2_value');
}

try { row3_label = $kv.get('row3_label_value') || ''; } catch (e) {
console.log('Failed to get row3_label_value');
}
try { row3 = $kv.get('panel_row3_value') || ''; } catch (e) {
console.log('Failed to get panel_row3_value');
}

$room.setPanelTemplate({
  template: '3_rows_of_labels',
  row1_label: row1_label,
  row1_value: row1,
  row2_label: row2_label,
  row2_value: row2,
  row3_label: row3_label,
  row3_value: row3
});
