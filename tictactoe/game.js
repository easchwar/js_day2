var Board = require('./board.js');

function Game(reader) {
  this.board = new Board();
  this.reader = reader;
  this.currentPiece = 'X';
}

Game.prototype._switchPiece = function() {
  this.currentPiece = this.currentPiece === 'X' ? 'O' : 'X';
};

Game.prototype.promptMove = function(callback) {
  this.board.print();
  this.reader.question("Player " + this.currentPiece + ", make a move: ", function(answer) {
    var x = parseInt(answer.substring(0,1));
    var y = parseInt(answer.substring(2,3));
    callback(x, y);
  });

};

Game.prototype.run = function(completionCallback) {
  this.promptMove(function(x,y) {
    if (this.board.isValidPos([x,y])) {
      this.board.placePiece([x,y], this.currentPiece);
      this._switchPiece();
    } else {
      console.log("Invalid move");
    }
    if (this.board.isOver()) {
      this.board.print();

      var endMessage = 'Draw';
      if (this.board.isWon('X')) {
        endMessage = 'X wins!';
      }
      if (this.board.isWon('O')) {
        endMessage = 'O wins!';
      }
      completionCallback(endMessage);
    } else {
      this.run(completionCallback);
    }
  }.bind(this));
};

module.exports = Game;
