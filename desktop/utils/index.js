const util = require('util');
const _ = require('lodash');

const stringify = (input) =>
  _.isPlainObject(input) || _.isArray(input)
    ? util.format('%o', input)
    : _.toString(input);

module.exports = { stringify };
