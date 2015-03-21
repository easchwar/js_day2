
Function.prototype.myBind = function(context) {
  var fn = this;
  var args = [].slice.call(arguments, 1);
  return function() {
    return fn.apply(context, args.concat([].slice.call(arguments, 0)));
  };
};


var olaf = {
  name: 'Olaf',
  saysName: function(n) {
    for (var i = 0; i < n; i++) {
      console.log(this.name);
    }
  }
};

var callTwice = function(cb) {
  cb(2);
};


// setTimeout(olaf.saysName.myBind(olaf), 0);
// callTwice(olaf.saysName.myBind(olaf, 3));

var fn = parseInt.myBind(null, '11');

console.log('parse int: ' + fn(4));
