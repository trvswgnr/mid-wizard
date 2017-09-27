/* GLOBAL VARIABLES
------------------------------------------------- */
// @NOTE: Make sure these are added to the jshint/jslint config file

/**
 * Primary Wizard Object
 * @class
 */
var Wizard = function () {}

/**
 * Input Object (stores in cookie)
 */
var input = {},
  /** @namespace */
  section = {
    count: 1
  },
  /** @namespace */
  subsection = {
    count: 1
  },
  /** @namespace */
  view = {
    count: 1
  },

  btns = $("button");

let animation_time = 400;

