/**
 * Navigate to past subsections in the Wizard.
 */
Wizard.nav = function () {

  // go to subsection from nav
  $(document).on('click', '.nav-subsection.done', function () {
    //subsection
    subsection.c = $(subsection.el + '.active');
    subsection.n = $data('subsection-order', $(this).data('nav-subsection'));
    subsection.c.removeClass("active");
    subsection.n.addClass("active in-review").removeClass('subsection-done');
    subsection.count = subsection.n.data("subsection-order");

    // view
    $(view.el).removeClass('active');
    view.n = subsection.n.find(view.el + ':first');
    view.count = view.n.data("view");

    // change label text for review
    change_label_text(true);
  });
}
