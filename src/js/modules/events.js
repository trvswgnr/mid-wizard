/**
 * Initialize Click / Action Events
 */
Wizard.events = function () {

  // prevent default button functionality
  btns.click(function (e) {
    e.preventDefault();
  });

  Wizard.change_view();

  Wizard.review_subsection();

  Wizard.change_subsection();

  Wizard.change_section();
//  Wizard.nav_subsection();
  Wizard.devnav();
}
