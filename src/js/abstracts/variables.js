/* GLOBAL VARIABLES
------------------------------------------------- */
// @NOTE: Make sure these are added to the jshint/jslint config file

/**
 * Primary Wizard Object
 * @class
 */
var Wizard = {
  settings: {
    section_el: "section",
    subsection_el: ".subsection",
    view_el: "fieldset"
  }
};

/**
 * Input Object (stores in cookie)
 */
let input = {},
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
