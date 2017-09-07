/* CLICK / EVENT ACTIONS
------------------------------------------------- */
wizard.events = function() {
  "use strict";

  // @NOTE: c - current, n - next, p - previous
  var section = {},
    subsection = {},
    view = {},
    input = {},
    btns = $("button");

  // prevent default button functionality
  btns.click(function(e) {
    e.preventDefault();
  });



  // go to next view
  $("button.get-next-view").click(function() {
    $(".get-next-section").hide(); //here because bug?
    view.c = $(this).closest("fieldset");
    view.n = view.c.next("fieldset");
    view.c.removeClass("active").addClass("done");
    view.n.removeClass("done").addClass("active");
    view.count = view.n.data("view");
    input.values = $("#wizard").serializeArray();
    setTimeout(function() {
      $("#intro").remove();
    }, 800);
    dynamic_text();
  });

  // go to previous view
  $("button.get-prev-view").click(function() {
    view.c = $(this).closest("fieldset");
    view.p = view.c.prev("fieldset");
    view.c.removeClass("active");
    view.p.removeClass("done").addClass("active");
    view.count = view.p.data("view");
  });

  // change the labels when the subsection is under review
  function change_label_text(x) {
    var label = $("input").not('[type="radio"]').prev("label");

    $.each(label, function() {
      var og_text,
        new_text,
        el = $(this),
        attr_for = el.attr("for");
      if (x === true) {
        (og_text = el.text()), (new_text = $("#" + attr_for).attr(
          "placeholder"
        ));
        el.text(new_text).attr("data-guide-text", og_text);
        el.append('<div class="edit-field"></div>');
      } else {
        new_text = el.data("guide-text");
        el.text(new_text);
        $(".edit-field").remove();
      }
    });
  }

  // review the current subsection
  $("button.review-subsection").click(function() {
    subsection.c = $data("view", view.count).closest(".subsection");
    subsection.n = subsection.c.next(".subsection");
    subsection.c.addClass("in-review");
    $(this).hide();
    btns.hide();
    $("button.get-next-subsection").show();
    change_label_text(true);
  });

  // go to the next subsection
  $("button.get-next-subsection").click(function() {
    setTimeout(function() {
      btns.show();
    }, 300);
    $("button.get-next-subsection").hide();
    subsection.c = $data("view", view.count).closest(".subsection");
    subsection.n = subsection.c.next(".subsection");
    subsection.c.removeClass("active in-review").addClass("done");
    subsection.n.addClass("active");
    subsection.count = subsection.n.data("subsection");
    console.log(subsection.count);
    view.n = subsection.n.find('[data-view="' + (view.count + 1) + '"]');
    view.c.removeClass("active");
    view.n.addClass("active");
    view.count = view.n.data("view");
    change_label_text(false);
    $('[data-nav-subsection="' + subsection.count + '"]').addClass("active");
  });

  // go to previous subsection
  $("button.get-prev-subsection").click(function() {
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

  // add focus class (for review subsection)
  $("input").on("focus", function() {
    $(this).addClass("is-focused");
  });
  $("input").on("blur", function() {
    $(this).removeClass("is-focused");
  });
}
