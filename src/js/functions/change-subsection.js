/* CHANGE SUBSECTION
------------------------------------------------- */
wizard.change_subsection = function (subsection, view, btns) {

  // go to the next subsection
  $("button.get-next-subsection").click(function () {
    setTimeout(function () {
      btns.show();
    }, 300);
    $("button.get-next-subsection").hide();

    //subsection
    subsection.c = $data("view", view.count).closest(".subsection");
    subsection.n = subsection.c.next(".subsection");
    subsection.c.removeClass("active in-review").addClass("done");
    subsection.n.addClass("active");
    subsection.count = subsection.n.data("subsection");

    // view
    view.n = subsection.n.find('[data-view="' + (view.count + 1) + '"]');
    view.c.removeClass("active");
    view.n.addClass("active");
    view.count = view.n.data("view");

    // nav
    $('[data-nav-subsection="' + subsection.count + '"]').addClass("active");
    $('[data-nav-subsection="' + (subsection.count - 1) + '"]').addClass("done");

    change_label_text(false);
  });



  // go to previous subsection
  $("button.get-prev-subsection").click(function () {
    $("button.get-next-subsection").hide();
    subsection.c = $data("view", view.count).closest(".subsection");
    subsection.p = subsection.c.prev(".subsection");
    subsection.c.removeClass("active");
    subsection.p.addClass("active").removeClass("done");
    view.p = subsection.p.find('[data-view="' + (view.count - 1) + '"]');
    view.c.removeClass("active");
    view.p.addClass("active").removeClass("done");
    view.count = view.p.data("view");
  });
}
