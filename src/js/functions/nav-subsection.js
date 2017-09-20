/* NAV SUBSECTION
------------------------------------------------- */
//wizard.nav_subsection = function (subsection, view) {
//
//  // go to subsection from nav
//  $(document).on('click', '.nav-subsection.done', function () {
//    subsection.c = $('.subsection.active');
//    subsection.n = $('[data-subsection-order="' + $(this).data('nav-subsection') + '"]');
//    subsection.c.removeClass("active");
//    subsection.n.addClass("active in-review").removeClass('subsection-done');
//    subsection.count = subsection.n.data("subsection-order");
//
//    // view
//    $('fieldset').removeClass('active');
//    view.n = subsection.n.find('fieldset:first');
//    $('fieldset').removeClass('active');
//    view.count = view.n.data("view");
//
//    // change label text for review
//    change_label_text(true);
//  });
//}

/* DEV NAV
------------------------------------------------- */
wizard.nav_subsection = function (subsection, view) {

  // go to subsection from nav
  $(document).on('click', '.nav-subsection', function () {
    subsection.c = $('.subsection.active');
    subsection.n = $('[data-subsection-order="' + $(this).data('nav-subsection') + '"]');
    subsection.c.removeClass("active in-review");
    subsection.n.addClass("active").removeClass('subsection-done');
    subsection.count = subsection.n.data("subsection-order");

    // view
    $('fieldset').removeClass('active');
    view.n = subsection.n.find('fieldset:first');
    $('fieldset').removeClass('active');
    view.n.addClass('active').removeClass('done');
    view.count = view.n.data("view");

    // change label text for review
    change_label_text(true);
  });
}
