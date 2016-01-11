var fs = require('fs');

var prepForBulkCreate = function(model) {
  // grab raw data
  var model = fs.readFileSync(__dirname + `/${model}.txt`, 'utf8').split('\n');

  // grab headings from first line
  var headings = model.shift().split(',').map(function(h) { return h.trim(); });

  // split lines by commas and map to objects by heading titles
  return model = model.map(function(line) {
    var result = {};
    var parts = line.split(',');
    return parts.map(function(part) {
      // convert string null to real null
      if (part === 'null') { return null; }
      // convert string numbers to real numbers
      if (+part) { return +part; }
      return part.trim();
    });
  })
  .map(function(attrs) {
    var result = {};
    headings.forEach(function(h, i) {
      result[h] = attrs[i];
    });
    return result;
  });
};

module.exports = {
  characters: prepForBulkCreate('characters'),
  events: prepForBulkCreate('events'),
  leagues: prepForBulkCreate('leagues'),
  rosters: prepForBulkCreate('rosters'),
  users: prepForBulkCreate('users'),
};
