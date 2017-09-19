wizard.change_section = function (section, subsection, view) {
  'use strict';
  // go to the next subsection
  $("button.get-next-section").click(function () {
    // section
    section.c = view.c.closest('section');
    section.n = section.c.next('section');

    // subsection
    subsection.n = section.n.find('[data-subsection="1"]');
    subsection.c.removeClass("active");
    subsection.n.addClass("active");
    subsection.count = view.n.data("view");

    // view
    view.n = subsection.n.find('[data-view="' + (view.count + 1) + '"]');
    view.c.removeClass("active");
    view.n.addClass("active");
    view.count = view.n.data("view");

  });
}
