/* CLICK / EVENT ACTIONS
------------------------------------------------- */
wizard.events = function () {
  "use strict";

  // @NOTE: c - current, n - next, p - previous
  var section = {},
    subsection = {},
    view = {},
    input = {},
    btns = $("button");

  // prevent default button functionality
  btns.click(function (e) {
    e.preventDefault();
  });

  wizard.change_view(view, input);

  wizard.review_subsection(subsection, view, btns);

  wizard.change_subsection(subsection, view, btns);

//  wizard.change_section(section, subsection, view, btns);

  // change section
  $('button.review-section').click(function(){

  });

  focus_inputs();

}
