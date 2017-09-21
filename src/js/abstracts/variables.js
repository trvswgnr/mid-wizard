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
  section,
  /** @namespace */
  subsection = {
    count: 1
  },
  /** @namespace */
  view = {
    count: 1
  },
  btns = $("button");
