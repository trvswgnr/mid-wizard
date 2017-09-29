/**
 * Go to a specific view number.
 */
Wizard.go_to_view = function (view_number) {
  let this_view = $data('view', view_number);

  // fieldset
  $(view.el).removeClass('active');
  view.count = view_number;
  view.n = $data('view', view.count);
  view.n.addClass('active').removeClass('done');
  view.count = view.n.data('view');

  // subsection
  $(subsection.el).removeClass('active');
  subsection.count = this_view.closest(subsection.el).data('subsection-order');
  subsection.n = $data('subsection-order', subsection.count);
  subsection.n.addClass('active').removeClass('subsection-done');

  //section
  $(section.el).removeClass('active');
  section.count = this_view.closest(section.el).data('section');
  section.c = $(section.el + '.active');
  section.n = $data('section', section.count);
  section.n.addClass('active');
}

 /**
   * Change the view from dev nav input
   * @arg {(string|number)} view - The 'data-title' (string), or the 'data-view' (number), of the desired view.
   */
Wizard.get_view = function(view) {
    $(subsection.el).removeClass('in-review');
    let is_integer = isNaN(view);
    let view_num = !is_integer ? $data('view', view).data('view') : $data('title', view).data('view');
    Wizard.go_to_view(view_num);
  };

view.activate = function () {
  view.c.removeClass("active slide-in-left").addClass("done");
  view.n.removeClass("done").addClass("active");
};

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
    $(view.el).removeClass('active');
    view.p.addClass("active slide-in-left");
    view.count = view.count - 1
  });
};
