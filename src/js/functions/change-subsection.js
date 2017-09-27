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
    $('[data-nav-subsection="' + subsection.count + '"]').addClass("active");
    $('[data-nav-subsection="' + (subsection.count - 1) + '"]').addClass("done");

    change_label_text(false);
  });


  // go to previous subsection
//  $("button.get-prev-subsection").click(function () {
//    $("button.get-next-subsection").hide();
//    subsection.c = $('[data-subsection-order="' + subsection.count + '"]');
//    subsection.p = $('[data-subsection-order="' + (subsection.count - 1) + '"]');
//    subsection.c.removeClass("active");
//    subsection.p.addClass("active").removeClass("done");
//    view.p = subsection.p.find('[data-view="' + (view.count - 1) + '"]');
//    view.c.removeClass("active");
//    view.p.addClass("active");
//    view.count = view.p.data("view");
//  });

}
