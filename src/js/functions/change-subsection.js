// activate subsection by adding class to next and removing from current
subsection.activate = function () {
  subsection.c.removeClass("active").addClass('subsection-done');
  subsection.n.addClass("active").removeClass('subsection-done');
}

/**
 * Advance to the next subsection.
 */
Wizard.change_subsection = function () {

  // go to the next subsection
  $("button.get-next-subsection").click(function (e) {
    e.preventDefault();

    //show buttons after animation
    setTimeout(function () {
      btns.show();
    }, animation_time);

    //subsection
    subsection.c = $('.subsection.active');
    subsection.n = $('[data-subsection-order="' + (subsection.count + 1) + '"]');
    subsection.activate();
    subsection.count = subsection.n.data("subsection-order");

    // view
    view.c = subsection.c.find('fieldset:last');
    view.count = view.c.data("view");
    view.n = $('[data-view="' + (view.count + 1) + '"]');
    view.activate();
    view.count = view.n.data("view");

    // nav
    $data('nav-subsection', subsection.count).addClass("active");
    $data('nav-subsection', (subsection.count - 1)).addClass("done");

    // change label texts back to normal
    change_label_text(false);
  });

}
