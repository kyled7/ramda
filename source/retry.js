import _curry3 from './internal/_curry3.js';
import T from './T.js';


/**
 * Retry: attempts to get a true response from the function at most N times
 *
 * @func
 * @memberOf R
 * @param {Function} fn The function to invoke. It should return a true or false.
 * @param {Number} timeout The number of milliseconds to delay.
 * @param {Object} opts The options object
 * @param {Number} opts.max The maximum number of times to invoke the function to get a success response. If null it will retry forever.
 * @return {Boolean} Returns true if the func returns a success response, false otherwise.
 * @example
 *
 *      R.retry(f, 1000, {max: 3});       //=>  true or false after max of 3 times
 */
var attempts = 1;
var retry = _curry3(function retry(fn, timeout, opts) {
  var timeout = timeout || 0;
  var opts = opts || {};
  return new Promise(function(resolve) {
    var maxAttempt = opts.max;
    setTimeout(function() {
      var result = fn();
      if (result === T() || (maxAttempt && attempts >= maxAttempt)) {
        resolve(result);
      } else {
        attempts++;
        retry(fn, timeout, opts).then(resolve);
      }
    }, timeout);
  });
});
export default retry;
