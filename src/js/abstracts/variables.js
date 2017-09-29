/* GLOBAL VARIABLES
------------------------------------------------- */
// @NOTE: Make sure these are added to the jshint/jslint config file

/**
 * Primary Wizard Object
 * @namespace
 */
var Wizard = function() {

};

/**
 * Object for storing form input data.
 */
let input = {},
  /**
   * Section element, count, next, current, and previous.
   */
  section = {
    count: 1
  },
  /**
   * Subsection element, count, next, current, and previous.
   */
  subsection = {
    count: 1
  },
  /**
   * 'View' element, count, next, current, and previous.
   */
  view = {
    count: 1
  },
  btns = $("button");

/**
 * Use with setTimeout() to match animation time with css animation transition.
 */
let animation_time = 400;
