var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function HanoiGame(){
  this.stacks = [[3,2,1],[],[]];

}

HanoiGame.prototype.isWon = function(){
  return (this.stacks[1].length === 3 || this.stacks[2].length === 3);
};

HanoiGame.prototype.isValidMove = function(startTowerIdx, endTowerIdx){
  var startStack = this.stacks[startTowerIdx];
  var endStack   = this.stacks[endTowerIdx];

  if (!startStack || !endStack) {
    return false;
  }

  if ( startStack.length === 0 ) {
    return false;
  }
  if ( endStack.length === 0) {
    return true;
  }
  return startStack[startStack.length - 1] < endStack[endStack.length - 1];
};

HanoiGame.prototype.move = function(startTowerIdx, endTowerIdx){
  if ( this.isValidMove(startTowerIdx, endTowerIdx) ) {
    this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
  } else {
    console.log("Bad move");
  }
};

HanoiGame.prototype.print = function(){
  console.log(JSON.stringify(this.stacks));
};

HanoiGame.prototype.promptMove = function(callback){
  this.print();
  reader.question("Make a move:\n", function(answer){
    var start = parseInt(answer.substring(0,1));
    var end =   parseInt(answer.substring(2,3));
    callback(start, end);
  });
};

HanoiGame.prototype.run = function(completionCallback){
  this.promptMove(function(start, end){
    this.move(start, end);
    if ( this.isWon() ){
      this.print();
      completionCallback();
    } else {
      this.run(completionCallback);
    }
  }.bind(this));
};

var game = new HanoiGame();
game.run(function(){
  console.log("You won!");
  reader.close();
});
