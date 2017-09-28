/**
 * Add classes, data-attributes, navigation and other automated startup functions.
 */

Wizard.startup = function () {

  // add data-attribute matching the order of sections,
  // subsections in each section, and views(fieldsets) in each subsection
  $(Wizard.settings.section_el).each(function (i) {
    var subsections = $(this).find(Wizard.settings.subsection_el);
    $(this).attr("data-section", i + 1);
    subsections.each(function (i) {
      var fieldsets = $(this).find(Wizard.settings.view_el);
      $(this).attr("data-subsection", i + 1);
      fieldsets.each(function (i) {
        $(this).attr("data-fieldset", i + 1);
      });
    });
  });

  // add data attribute for view(fieldset) order in document
  $('fieldset').each(function (i) {
    $(this).attr("data-view", i + 1);
  });

  // add data attribute for section order in document
  $('.subsection').each(function (i) {
    $(this).attr("data-subsection-order", i + 1);
  });

  // add active class to first of each
  $('[data-section="1"]').addClass("active");
  $('[data-subsection="1"]').addClass("active");
  $('[data-view="1"]').addClass("active");

  // lazy add next subsection and next section after the review buttons
  $(".review-subsection").after(
    '<button class="get-next-subsection">Confirm & Continue</button>'
  );
  $(".review-section").after(
    '<button class="get-next-section">Next Section</button>'
  );

  /* ADD NAV
  ------------------------------------------------- */
  $(Wizard.settings.section_el).each(function () {

    // @TODO: these variable names suck
    var s = $(this),
      s_d = s.data("section"),
      s_n = s.data("title"),
      ss,
      ss_d,
      ss_n,
      ss_in_s = $(this).find(Wizard.settings.subsection_el);

    // match section data attr in nav
    $(".wizard__nav").append(
      '<ul class="nav-section" data-nav-section="' + s_d + '">' +
      '<h4 class="nav-section-title">' + s_n + "</h4>" +
      "</ul>"
    );

    ss_in_s.each(function () {
      ss = $(this);
      ss_d = ss.data("subsection-order");
      ss_n = ss.data('title');
      // add subsection review text
      ss.prepend(
        '<div class="review-guide-text">' +
        '<h3>Verify ' + ss.data('title') + '.</h3>' +
        '</div>'
      );
      // match subsection data attr in nav
      $data('nav-section', s_d).append(
        '<li class="nav-subsection" data-nav-subsection="' +
        ss_d +
        '">' +
        ss_n +
        "<div class='nav-active-dot'></div></li>"
      );
    });
  });

  // add fieldset title for in-review
  $(Wizard.settings.view_el).each(function () {
    var this_title = $(this).data('title');
    this_title = this_title != undefined ? this_title : false;

    if (this_title) {
      $(this).prepend('<div class="review-fieldset-label">' + this_title + '</div>');
    }
  });

  // add initial active classes and identify first for styling
  $(".wizard__nav .nav-section:first," +
    ".wizard__nav .nav-subsection:first," +
    ".wizard__nav .nav-section-title:first").addClass("active is-first");

 cookie_storage();

  // initialize select2
  $('select').each(function () {
    $(this).select2({
      placeholder: $(this).attr('placeholder')
    });
  });


}
