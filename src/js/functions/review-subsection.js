/* REVIEW SUBSECTION
------------------------------------------------- */
wizard.review_subsection = function(subsection,view) {

  // review the current subsection
  $("button.review-subsection, button.review-section").click(function() {
    subsection.c = $('[data-subsection-order="'+subsection.count+'"]');
    subsection.n = $('[data-subsection-order="'+(subsection.count+1)+'"]');

    $('[data-view="'+view.count+'"]').removeClass('active').addClass('done');
    // match timeout to css animation finish
    // @TODO: should probably use jQuery Animate for moving the element, then add transitions in css (to detect end of animation)
    setTimeout(function(){
      subsection.c.addClass("in-review")
    }, 400);

    // change label text for review
    change_label_text(true);
  });
}
