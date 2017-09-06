(function () {
  "use strict";
  $("section").each(function (i) {
    var subsections = $(this).find(".subsection");
    $(this).attr("data-section", i + 1);
    subsections.each(function (i) {
      var fieldsets = $(this).find("fieldset");
      $(this).attr("data-subsection", i + 1);
      fieldsets.each(function (i) {
        $(this).attr("data-fieldset", i + 1);
      });
    });
  });

  $("fieldset").each(function (i) {
    $(this).attr("data-view", i + 1);
  });

  $(".subsection").each(function (i) {
    $(this).attr("data-subsection-order", i + 1);
  });

  $('[data-section="1"]').addClass("active");

  $('[data-subsection="1"]').addClass("active");

  $('[data-view="1"]').addClass("active");

  $(".review-subsection").after(
    '<button class="get-next-subsection">Next Sub-Section</button>'
  );

  $(".review-section").after(
    '<button class="get-next-section">Next Section</button>'
  );
})();


/* ADD NAV
------------------------------------------------- */
$('section').each(function () {
  var s = $(this);
  var s_d = s.data('section');
  var s_n = s.attr('title'),
    ss, ss_d, ss_n;
  $('.wizard-nav').append('<ul class="nav-section active" data-section="' + s_d + '"><h4 class="nav-section-title active" data-section-order="' + s_d + '">' + s_n + '</h4></ul>');
  $('.subsection').each(function () {
    ss = $(this);
    ss_d = ss.data('subsection-order');
    ss_n = ss.attr('title');
    $('[data-section="' + s_d + '"]').append('<li>' + ss_n + '</li>');
  });
});

/* CLICK EVENTS
------------------------------------------------- */
(function () {
  "use strict";

  function $data(data, val) {
    return $("[data-" + data + '="' + val + '"]');
  }
  // c - current, n - next, p - previous
  var section = {
      el: $("section")
    },
    subsection = {
      el: $(".subsection")
    },
    view = {
      el: $("fieldset")
    },
    btns = $("button"),
    input = {};
  btns.click(function (e) {
    e.preventDefault();
  });

  // go to next view
  $("button.get-next-view").click(function () {
    $(".get-next-section").hide(); //here because bug?
    view.c = $(this).closest("fieldset");
    view.n = view.c.next("fieldset");
    view.c.removeClass("active").addClass("done");
    view.n.removeClass("done").addClass("active");
    view.count = view.n.data("view");
    input.values = $("#wizard").serializeArray();
    $('#intro').addClass('u-hidden');
  });

  // go to previous view
  $("button.get-prev-view").click(function () {
    view.c = $(this).closest("fieldset");
    view.p = view.c.prev("fieldset");
    view.c.removeClass("active");
    view.p.removeClass("done").addClass("active");
    view.count = view.p.data("view");
  });

  // review the current subsection
  $("button.review-subsection").click(function () {
    subsection.c = $data("view", view.count).closest(".subsection");
    subsection.n = subsection.c.next(".subsection");
    subsection.c.addClass("in-review");
    $(this).hide();
    btns.hide();
    $("button.get-next-subsection").show();
  });

  // go to the next subsection
  $("button.get-next-subsection").click(function () {
    setTimeout(function () {
      btns.show();
    }, 300);
    $("button.get-next-subsection").hide();
    subsection.c = $data("view", view.count).closest(".subsection");
    subsection.n = subsection.c.next(".subsection");
    subsection.c.removeClass("active in-review").addClass("done");
    subsection.n.addClass("active");
    subsection.count = subsection.n.data('subsection');
    console.log(subsection.count);
    view.n = subsection.n.find('[data-view="' + (view.count + 1) + '"]');
    view.c.removeClass("active");
    view.n.addClass("active");
    view.count = view.n.data("view");
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

  $('input').on('focus', function () {
    $(this).addClass('is-focused');
  });
  $('input').on('blur', function () {
    $(this).removeClass('is-focused');
  });

})();
