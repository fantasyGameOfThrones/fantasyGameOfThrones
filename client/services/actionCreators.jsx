var setSelectedPlayer = function( player ){
  return {
    type: SET_SELECTED_PLAYER,
    payload: player,
  }
};

module.exports = {
  setSelectedPlayer,
};