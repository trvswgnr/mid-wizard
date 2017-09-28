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
    //subsection
    subsection.c = $(Wizard.settings.subsection_el + '.active');
    subsection.n = $data('subsection-order', $(this).data('nav-subsection'));
    subsection.c.removeClass("active");
    subsection.n.addClass("active in-review").removeClass('subsection-done');
    subsection.count = subsection.n.data("subsection-order");

    // view
    $(Wizard.settings.view_el).removeClass('active');
    view.n = subsection.n.find(Wizard.settings.view_el + ':first');
    view.count = view.n.data("view");

    // change label text for review
    change_label_text(true);
  });
}
