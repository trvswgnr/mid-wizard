Wizard.go_section = function (section_number) {
  // section
  $(section.el).removeClass('active');
  section.count = section_number;
  section.c = $(section.el + '.active');
  section.n = $data(section.el, section.count);
  section.n.addClass('active');

  // subsection
  $(subsection.el).removeClass('active');
  subsection.count = section.n.find(subsection.el + ':first').data('subsection-order');
  subsection.n = section.n.find(subsection.el + ':first');
  subsection.n.addClass('active').removeClass('subsection-done');

  // view
  $(view.el).removeClass('active');
  view.count = subsection.n.find(view.el + ':first').data('view');
  view.n = $data('view', view.count);
  view.n.addClass('active').removeClass('done');
}

/**
 * CHANGE SECTION
 */
Wizard.change_section = function () {
  // go to the next subsection
  $("button.get-next-section").click(function () {
    // section
    section.c = $(section.el + '.active');
    section.n = $data('section', (section.count + 1));
    section.c.removeClass('active');
    section.n.addClass('active');
    section.count = section.n.data('section');
    // follow section in nav
    $data('nav-section', section.count).addClass("active");
    $data('nav-section', (section.count - 1)).addClass("done");

    // subsection
    subsection.c = $(subsection.el + '.active');
    subsection.n = $data('subsection-order', (subsection.count + 1));
    subsection.activate();
    subsection.count = subsection.n.data("subsection-order");
    // follow subsection in nav
    $data('nav-subsection', subsection.count).addClass("active");
    $data('nav-subsection', (subsection.count - 1)).addClass("done");

    // view
    view.n = subsection.n.find(view.el + ':first');
    view.activate();
    view.count = view.n.data("view");
    change_label_text(false);
  });
}
