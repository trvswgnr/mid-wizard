/**
 * Initialize the app.
 * @namespace
 * @arg {Object} options - Options that override the defaults.
 * @arg {Object} options.elements - Element tag or class names.
 * @arg {string} [options.elements.section=section] - Tag or class name for targeting 'sections' in the DOM.
 * @arg {string} [options.elements.subsection=.subsection] - Tag or class name for targeting 'subsections' in the DOM.
 * @arg {string} [options.elements.view=fieldset] - Tag or class name for targeting 'views' in the DOM.
 */
let init = function (options = {}) {
  Wizard.settings = {
    elements: {
      section: "section",
      subsection: ".subsection",
      view: "fieldset",
      form: '#wizard_form'
    },
    cookies: {
      input: 'input_fields',
      view: 'view_count'
    }
  };
  $.extend(true, Wizard.settings, options);
  section.el = Wizard.settings.elements.section;
  subsection.el = Wizard.settings.elements.subsection;
  view.el = Wizard.settings.elements.view;

  Wizard.startup();

  Wizard.events();


};

init();
