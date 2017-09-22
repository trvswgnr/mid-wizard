/* NAV SUBSECTION
------------------------------------------------- */
/**
 * Navigate to past subsections in the Wizard.
 * @arg {Object} subsection - The SubSection Object that stores current, next, and previous SubSections.
 * @arg {Object} view - The View Object that stores current, next, and previous Views.
 */
Wizard.nav_subsection = function () {

  // go to subsection from nav
  $(document).on('click', '.nav-subsection.done', function () {
    subsection.c = $('.subsection.active');
    subsection.n = $('[data-subsection-order="' + $(this).data('nav-subsection') + '"]');
    subsection.c.removeClass("active");
    subsection.n.addClass("active in-review").removeClass('subsection-done');
    subsection.count = subsection.n.data("subsection-order");

    // view
    $('fieldset').removeClass('active');
    view.n = subsection.n.find('fieldset:first');
    $('fieldset').removeClass('active');
    view.count = view.n.data("view");

    // change label text for review
    change_label_text(true);
  });
}

/* DEV NAV
------------------------------------------------- */
Wizard.devnav = function () {

  // go to section/subsection from nav
  $(document).on('click', '.nav-subsection', function () {
    $('section').removeClass('active');
    section.c = $('section.active');
    section.n = $data('section',$(this).closest('[data-nav-section]').data('nav-section'));
    section.c.removeClass('active');
    section.n.addClass('active');
    section.count = section.n.data('section');

    $('.subsection').removeClass('active');
    subsection.c = $('.subsection.active');
    subsection.n = $('[data-subsection-order="' + $(this).data('nav-subsection') + '"]');
    subsection.c.removeClass("active in-review");
    subsection.n.addClass("active").removeClass('subsection-done');
    subsection.count = subsection.n.data("subsection-order");

    // view
    $('fieldset').removeClass('active');
    view.n = subsection.n.find('fieldset:first');
    view.n.addClass('active').removeClass('done');
    view.count = view.n.data("view");

    // change label text for review
//    change_label_text(true);
  });
}
