/* CHANGE VIEW
------------------------------------------------- */
wizard.change_view = function (view, input) {

  // go to next view
  $("button.get-next-view").click(function () {
    view.c = $(this).closest("fieldset");
    view.n = view.c.next("fieldset");
    view.c.removeClass("active").addClass("done");
    view.n.removeClass("done").addClass("active");
    view.count = view.n.data("view");
    input.values = $("#wizard").serializeArray();
    setTimeout(function () {
      $("#intro").remove();
    }, 800);
    dynamic_text();
  });

  // go to previous view
  $("button.get-prev-view").click(function () {
    view.c = $(this).closest("fieldset");
    view.p = view.c.prev("fieldset");
    view.c.removeClass("active");
    view.p.addClass("active slide-in-left");
    view.count = view.p.data("view");
  });
}
