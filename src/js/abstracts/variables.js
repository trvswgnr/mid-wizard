/* GLOBAL VARIABLES
------------------------------------------------- */
// @NOTE: Make sure these are added to the jshint/jslint config file

/**
 * Primary Wizard Object
 * @namespace
 */
var Wizard = {
  settings: {
    section_el: "section",
    subsection_el: ".subsection",
    view_el: "fieldset"
  }
};

let input = {},
  section = {
    count: 1
  },
  subsection = {
    count: 1
  },
  view = {
    count: 1
  },
  btns = $("button");

let animation_time = 400;
