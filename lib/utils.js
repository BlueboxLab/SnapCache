/**
 * Generates a unique cache key based on an object or string.
 * @param {string|Object} input - The input to generate a key from.
 * @returns {string} - The generated unique key.
 */
function generateCacheKey(input) {
  return typeof input === 'object' ? JSON.stringify(input) : String(input);
}

/**
 * Checks if a value is of the expected type.
 * @param {any} value - The value to check.
 * @param {string} type - The expected type (e.g., 'string', 'number', 'object').
 * @returns {boolean} - True if the value matches the expected type.
 */
function isType(value, type) {
  return typeof value === type;
}

/**
 * Converts time units to milliseconds.
 * @param {number} time - The time value.
 * @param {string} unit - The unit of time ('ms' for milliseconds, 's' for seconds, 'm' for minutes).
 * @returns {number} - The time in milliseconds.
 */
function convertToMilliseconds(time, unit = 'ms') {
  switch (unit) {
    case 's':
      return time * 1000;
    case 'm':
      return time * 60 * 1000;
    case 'ms':
    default:
      return time;
  }
}

module.exports = {
  generateCacheKey,
  isType,
  convertToMilliseconds,
};
