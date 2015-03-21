var readline = require('readline');

var lib = require('./index.js');
var Game = lib.Game;
var Board = lib.Board;

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var game = new Game(reader);

game.run(function (endMessage) {
  console.log(endMessage);
  reader.close();
});
