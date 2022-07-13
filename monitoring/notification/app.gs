const sheet = SpreadsheetApp.getActiveSheet();
function app() {

  const table = sheet.getDataRange().getValues();
  let headers = table.shift();

  let data = table.map(r => {
    let obj = {};
    r.forEach((cell, i) => {
      obj[headers[i]] = cell;
    })
    return obj;
  });

  var res = alasql("SELECT * from (select id, name,due_date,  DATEDIFF(day, getdate(), t.due_date) AS days FROM ? t) WHERE days < 10", [data]);
  res.forEach(row => {
    if (row.days < 3) {
      drawRow(row.id, 'red');
    }
    else if (row.days < 7) {
      drawRow(row.id, 'yellow');
    }
    else {
      drawRow(row.id, 'orange');
    }
  });
   if (res.length > 0) {
    sendServerEmail({servers:res});
  }
}

function drawRow(id, color) {
  sheet.getRange(id + 1, 1, 1, sheet.getLastColumn()).setBackground(color);
}



