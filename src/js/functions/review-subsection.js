/* REVIEW SUBSECTION
------------------------------------------------- */
wizard.review_subsection = function(subsection,view,btns) {
  // review the current subsection
  $("button.review-subsection, button.review-section").click(function() {
    subsection.c = $data("view", view.count).closest(".subsection");
    subsection.n = subsection.c.next(".subsection");
    subsection.c.addClass("in-review");
    $(this).hide();
    btns.hide();
    $("button.get-next-subsection, button.get-next-section").show();
    change_label_text(true);
  });
}
