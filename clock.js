function Clock () {
}

Clock.TICK = 5000;

Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  var sec = this.currentTime.getSeconds();
  var min = this.currentTime.getMinutes();
  var hr = this.currentTime.getHours();
  console.log(hr + ":" + min + ":" + sec);
};

Clock.prototype.run = function () {
  // 1. Set the currentTime.
  // 2. Call printTime.
  // 3. Schedule the tick interval.
  this.currentTime = new Date();
  this.printTime();
  setTimeout(this._tick.bind(this), Clock.TICK);
};

Clock.prototype._tick = function () {
  // 1. Increment the currentTime.
  // 2. Call printTime.
  this.currentTime.setTime(this.currentTime.getTime() + Clock.TICK);
  this.printTime();
  setTimeout(this._tick.bind(this), Clock.TICK);
};

var clock = new Clock();
clock.run();
