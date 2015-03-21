var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function(sum, numsLeft, completionCallback) {
  if ( numsLeft > 0 ) {
    reader.question("Give me a number:\n", function(answer){
      var num = parseInt(answer);
      console.log(sum += num);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else {
    completionCallback(sum);
  }
};



addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
  reader.close();
});
