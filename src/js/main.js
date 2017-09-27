/**
 * Initialize the Wizard.
 */
Wizard.init = function (options = {}) {
  $.extend(true, Wizard.settings, options);

  Wizard.startup();

  Wizard.events();
}

Wizard.init();
