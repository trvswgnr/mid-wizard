/**
 * Go to a specific view number.
 */
Wizard.go_to_view = function (view_number) {
  let this_view = $data('view', view_number);

  // fieldset
  $(Wizard.settings.view_el).removeClass('active');
  view.count = view_number;
  view.n = $data('view', view.count);
  view.n.addClass('active').removeClass('done');
  view.count = view.n.data('view');

  // subsection
  $(Wizard.settings.subsection_el).removeClass('active');
  subsection.count = this_view.closest(Wizard.settings.subsection_el).data('subsection-order');
  subsection.n = $data('subsection-order', subsection.count);
  subsection.n.addClass('active').removeClass('subsection-done');

  //section
  $(Wizard.settings.section_el).removeClass('active');
  section.count = this_view.closest(Wizard.settings.section_el).data('section');
  section.c = $(Wizard.settings.section_el + '.active');
  section.n = $data('section', section.count);
  section.n.addClass('active');
}

view.activate = function () {
  view.c.removeClass("active slide-in-left").addClass("done");
  view.n.removeClass("done").addClass("active");
}

/**
 * Change the current view
 */
Wizard.change_view = function () {

  // go to next view
  $("button.get-next-view").click(function () {
    view.c = $data('view', view.count);
    view.n = $data('view', (view.count + 1));
    view.activate();
    view.count = view.n.data("view");


    setTimeout(function () {
      $("#intro").remove();
    }, (animation_time * 2));

    dynamic_text();

  });

  // go to previous view
  $("button.get-prev-view").click(function () {
    view.c = $data('view', view.count);
    view.p = $data('view', (view.count - 1));
    $(Wizard.settings.view_el).removeClass('active');
    view.p.addClass("active slide-in-left");
    view.count = view.count - 1
  });
}
