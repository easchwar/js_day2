var fs = require('fs');

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
  path.pop();
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
  return (this.grid[x][y] !== '*');
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

Maze.prototype._recursiveSearch = function(pos, travelled) {
  if ( !this._isValidPos(pos) ) {
    return null;
  }
  if ( this.get(pos) === 'E' ) {
    return [pos];
  }
  travelled.push(pos);
  var result = null;
  for (var i = 0; i < Maze.DIRS.length; i++) {
    var newPos = this.addPos(pos, Maze.DIRS[i]);

    if ( this.includedIn(newPos, travelled) ) {
      continue;
    }
    result = this._recursiveSearch(newPos, travelled);
    if ( result !== null ) {
      return [pos].concat(result);
    }
  }

  return null;
};

Maze.prototype.solveDFS = function() {
  var start = [6, 1];
  var path = this._recursiveSearch(start, []);
  // this.printPath(path);
};


Maze.prototype.validNeighbors = function(node, alreadyVisited, posTree) {
  var neighbors = [];
  for (var i = 0; i < Maze.DIRS.length; i++) {
    var newPos = this.addPos(pos, Maze.DIRS[i]);
    if (this.includedIn(newPos, alreadyVisited) || !this._isValidPos(newPos)) {
      continue;
    }

    neighbors.push(new Node(newPos, node);
  }
  return neighbors;
};

Maze.prototype.solveBFS = function(start) {
  function Node(pos, parent) {
    this.position = pos;
    this.parent = parent;
  }

  var queue = [];
  var alreadyVisited = [start];

  var node = new Node(start, null);

  do {
    queue.concat(this.validNeighbors(node.position, alreadyVisited));

    var newNode = new Node(queue.shift(), node);
    alreadyVisited.push(newNode.position);

  } while (queue.length > 0);

};


var maze = new Maze('maze1.txt');
maze.print();
maze.solveDFS();
