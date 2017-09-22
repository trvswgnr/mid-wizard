Wizard.change_section = function () {

  // go to the next subsection
  $("button.get-next-section").click(function () {
    // section
    section.c = $('section.active');
    section.n = $('[data-section="' + (section.count + 1) + '"]');
    section.c.removeClass('active');
    section.n.addClass('active');
    section.count = section.n.data('section');
    // follow section in nav
    $('[data-nav-section="' + section.count + '"]').addClass("active");
    $('[data-nav-section="' + (section.count - 1) + '"]').addClass("done");

    // subsection
    subsection.c = $('.subsection.active');
    subsection.n = $('[data-subsection-order="' + (subsection.count + 1) + '"]');
    subsection.activate();
    subsection.count = subsection.n.data("subsection-order");
    // follow subsection in nav
    $('[data-nav-subsection="' + subsection.count + '"]').addClass("active");
    $('[data-nav-subsection="' + (subsection.count - 1) + '"]').addClass("done");

    // view
    view.n = subsection.n.find('fieldset:first');
    view.activate();
    view.count = view.n.data("view");

  });
}
