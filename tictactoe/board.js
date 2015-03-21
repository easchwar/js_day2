
function Board() {
  this.grid = [[0,0,0],
               [0,0,0],
               [0,0,0]];
}

Board.prototype.placePiece = function(pos, piece) {
  if (this.isValidPos(pos)) {
    this.grid[pos[0]][pos[1]] = piece;
  } else {
    console.log('invalid move');
  }
};

Board.prototype.isValidPos = function(pos) {
  var x = pos[0];
  var y = pos[1];

  if (x < 0 || x > 2 || y < 0 || y > 2) {
    return false;
  }
  return this.grid[x][y] === 0;
};

Board.prototype.isWon = function(piece) {
  var rows = [];

  for (var i = 0; i < this.grid.length; i++) {
    rows.push(this.grid[i]);
    var col = [];
    for (var j = 0; j < this.grid.length; j++) {
      col.push(this.grid[j][i]);
    }
    rows.push(col);
  }

  rows.push([this.grid[0][0], this.grid[1][1], this.grid[2][2]]);
  rows.push([this.grid[2][0], this.grid[1][1], this.grid[0][2]]);

  for (var x = 0; x < rows.length; x++) {
    var row = rows[x];
    if (row[0] === piece && row[1] === piece && row[2] === piece ) {
      return true;
    }
  }
  return false;
};
//
// Board.prototype.forEach = function(cb) {
//   for(var x = 0; x < this.grid.length; x++) {
//     for(var y = 0; y < this.grid.length; y++) {
//       cb(this.grid[x][y]);
//     }
//   }
// };
//
// Board.prototype.any = function(value) {
//   var any = false;
//   this.forEach(function(pos){
//     if (pos === value) {
//       any = true;
//     }
//   });
//   return any;
// };

Board.prototype.isOver = function() {
  if (this.isWon('X') || this.isWon('O')) {
    return true;
  }
  
  for(var x = 0; x < this.grid.length; x++) {
    for(var y = 0; y < this.grid.length; y++) {
      if (this.grid[x][y] === 0) {
        return false;
      }
    }
  }
  return true;
};

Board.prototype.print = function() {
  for (var i = 0; i < this.grid.length; i++) {
    console.log(JSON.stringify(this.grid[i]));
  }
};


module.exports = Board;
