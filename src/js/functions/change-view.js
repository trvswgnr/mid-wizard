/* CHANGE VIEW
------------------------------------------------- */
wizard.change_view = function (view, input) {


  view.activate = function() {
    view.c.removeClass("active slide-in-left").addClass("done");
    view.n.removeClass("done").addClass("active");
  }

  // go to next view
  $("button.get-next-view").click(function () {
    view.c = $('[data-view="'+view.count+'"]');
    view.n = $('[data-view="'+(view.count+1)+'"]');
    view.activate();
    view.count = view.n.data("view");


    setTimeout(function () {
      $("#intro").remove();
    }, 800);

    dynamic_text();

  });

  // go to previous view
  $("button.get-prev-view").click(function () {
    view.c = $('[data-view="'+view.count+'"]');
    view.p = $('[data-view="'+(view.count-1)+'"]');
    view.c.removeClass("active");
    view.p.addClass("active slide-in-left");
    view.count = view.p.data("view");
  });
}
