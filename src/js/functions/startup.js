// add data attributes and active classes to initialize

wizard.startup = function () {
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

  /* ADD NAV
------------------------------------------------- */
  $("section").each(function () {
    var s = $(this),
      s_d = s.data("section"),
      s_n = s.attr("title"),
      ss,
      ss_d,
      ss_n,
      ss_in_s = $(this).find(".subsection");

    $(".wizard__nav").append(
      '<ul class="nav-section" data-nav-section="' +
      s_d +
      '"><h4 class="nav-section-title">' +
      s_n +
      "</h4></ul>"
    );

    ss_in_s.each(function () {
      ss = $(this);
      ss_d = ss.data("subsection-order");
      ss_n = ss.attr("title");
      $('[data-nav-section="' + s_d + '"]').append(
        '<li class="nav-subsection" data-nav-subsection="' +
        ss_d +
        '">' +
        ss_n +
        "</li>"
      );
    });
  });

  // add initial active classes and identify first for styling
  $(".wizard__nav .nav-section:first," +
    ".wizard__nav .nav-subsection:first," +
    ".wizard__nav .nav-section-title:first").addClass("active is-first");

}
