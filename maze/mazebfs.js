var fs = require('fs');
var Node = require('./node.js');

function Maze(filename) {
  this.grid = this.makeGrid(filename);
  this.height = this.grid.length;
  this.width =  this.grid[0].length;
}

Maze.prototype.parseFile = function(filename) {
   fs.readFileSync(filename, 'utf8');
};

Maze.prototype.makeGrid = function(filename) {
   var rows = fs.readFileSync(filename, 'utf8').split("\n");
   return rows.slice(0,rows.length - 1).map(function(row){
     return row.split('');
   });
};

Maze.prototype.print = function() {
  this.grid.forEach(function(row){
    console.log(row.join(''));
  });
};

Maze.prototype.printPath = function(path) {
  path.shift();
  path.forEach(function(pos){
    this.grid[pos[0]][pos[1]] = 'X';
  }.bind(this));
  this.print();
};

Maze.DIRS = [
  [-1, 0],
  [0,  1],
  [1,  0],
  [0, -1]
];

Maze.prototype._isValidPos = function(pos) {
  var x = pos[0];
  var y = pos[1];

  if (x < 0 || x >= this.height || y < 0 || y >= this.width) {
    return false;
  }
  return (this.grid[x][y] !== '*' && this.grid[x][y] !== '|' && this.grid[x][y] !== '-' && this.grid[x][y] !== '+');
};

Maze.prototype.get = function(pos) {
  return this.grid[pos[0]][pos[1]];
};

Maze.prototype.addPos = function(pos, dir) {
  return [pos[0] + dir[0], pos[1] + dir[1]];
};

Maze.prototype.includedIn = function(pos, arr) {
  for (var i = 0; i < arr.length; i++){
    if ( pos[0] === arr[i][0] && pos[1] === arr[i][1] ) {
      return true;
    }
  }
  return false;
};

Maze.prototype.buildPath = function(node) {
  var path = [];
  while (node.parent !== null) {
    path.push(node.position);
    node = node.parent;
  }
  return path;
};

Maze.prototype.validNeighbors = function(node, alreadyVisited) {
  var neighbors = [];
  for (var i = 0; i < Maze.DIRS.length; i++) {
    var newPos = this.addPos(node.position, Maze.DIRS[i]);
    if (this.includedIn(newPos, alreadyVisited) || !this._isValidPos(newPos)) {
      continue;
    }
    alreadyVisited.push(newPos);
    neighbors.push(new Node(newPos, node));
  }
  return neighbors;
};

Maze.prototype.solveBFS = function(start) {
  var node = new Node(start, null);
  var queue = [node];
  var alreadyVisited = [];
  do {
    node = queue.shift();
    alreadyVisited.push(node.position);

    var neighborNodes = this.validNeighbors(node, alreadyVisited);
    queue = queue.concat(neighborNodes);

  } while (this.get(node.position) !== 'E');

  var path = this.buildPath(node);
  return path;
};


var maze = new Maze('maze3.txt');
maze.print();
var path = maze.solveBFS([1, 0]);
maze.printPath(path);
