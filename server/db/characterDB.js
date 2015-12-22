
exports.addCharacter = function (data) {
  var sql = mysql.format('INSERT INTO characters SET ?', [data]);
  return connection.queryAsync(sql);
};

// Data is an object
// Name is a string
exports.updateCharacter = function (data, name) {
  var sql = mysql.format('UPDATE characters SET ? WHERE name = ?', [data, name]);
  return connection.queryAsync(sql);
};

exports.getCharacterInfo = function (data) {
  
};