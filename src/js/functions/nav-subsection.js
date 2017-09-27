/* NAV SUBSECTION
------------------------------------------------- */
/**
 * Navigate to past subsections in the Wizard.
 * @arg {Object} subsection - The SubSection Object that stores current, next, and previous SubSections.
 * @arg {Object} view - The View Object that stores current, next, and previous Views.
 */
Wizard.nav_subsection = function () {

  // go to subsection from nav
  $(document).on('click', '.nav-subsection.done', function () {
    subsection.c = $('.subsection.active');
    subsection.n = $('[data-subsection-order="' + $(this).data('nav-subsection') + '"]');
    subsection.c.removeClass("active");
    subsection.n.addClass("active in-review").removeClass('subsection-done');
    subsection.count = subsection.n.data("subsection-order");

    // view
    $('fieldset').removeClass('active');
    view.n = subsection.n.find('fieldset:first');
    $('fieldset').removeClass('active');
    view.count = view.n.data("view");

    // change label text for review
    change_label_text(true);
  });
}

/* --DEV-- NAV
------------------------------------------------- */
Wizard.devnav = function () {

  // go to section/subsection from nav
  $(document).on('click', '.nav-subsection', function () {
    $('section').removeClass('active');
    section.c = $('section.active');
    section.n = $data('section',$(this).closest('[data-nav-section]').data('nav-section'));
    section.c.removeClass('active');
    section.n.addClass('active');
    section.count = section.n.data('section');

    $('.subsection').removeClass('active');
    subsection.c = $('.subsection.active');
    subsection.n = $('[data-subsection-order="' + $(this).data('nav-subsection') + '"]');
    subsection.c.removeClass("active in-review");
    subsection.n.addClass("active").removeClass('subsection-done');
    subsection.count = subsection.n.data("subsection-order");

    // view
    $('fieldset').removeClass('active');
    view.n = subsection.n.find('fieldset:first');
    view.n.addClass('active').removeClass('done');
    view.count = view.n.data("view");
  });

  $(document).on('click', '.nav-section-title', function () {
      let el = $(this),
      this_section = el.closest('.nav-section').data('nav-section');
     Wizard.go_section(this_section);

    });
}

/**
 * --DEV-- CHANGE VIEW
 * @arg {string} view - The 'data-title' string, or the 'data-view' Number, of the desired view.
 */
Wizard.dev_view = function(view) {
  $('.subsection').removeClass('in-review');
  let is_integer = isNaN(view);
  let view_num = !is_integer ? $data('view',view).data('view') : $data('title',view).data('view');
  Wizard.go_to_view(view_num);
}

$(document).on('click','#dev_nav_btn', function(){
  var val = $('#dev_nav_input').val();
  Wizard.dev_view(val);
})
