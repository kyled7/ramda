var R = require('../source');
var eq = require('./shared/eq');


describe('retry', function() {
  it('return function result with max attempts', function() {
    let num = 1;
    let f = () => {
      return num++ >= 4;
    };
    R.retry(f, 100, {max: 3}).then(function(result) {
      eq(result, false)
    });

    num = 1;
    R.retry(f, 100, {max: 5}).then(function(result) {
      eq(result, true);
    });
  });

  it('return function result without max attempts', function() {
    let num = 1;
    let f = () => {
      return num++ >= 4;
    };
    R.retry(f, 100, {}).then(function(result) {
      eq(result, true);
    });
  });

});
