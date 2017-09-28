/**
 * (For development purposes only.)
 */
function dev_tools() {

  /**
   * Navigate through subsection and views from nav.
   * @arg {Object} $this - Pass the $(this) variable from a jQuery event.
   */
  function devnav($this) {
    // section
    $(Wizard.settings.section_el).removeClass('active');
    section.c = $(Wizard.settings.section_el + '.active');
    section.n = $data('section', $this.closest('[data-nav-section]').data('nav-section'));
    section.c.removeClass('active');
    section.n.addClass('active');
    section.count = section.n.data('section');

    // subsection
    $(Wizard.settings.subsection_el).removeClass('active');
    subsection.c = $(Wizard.settings.subsection_el + '.active');
    subsection.n = $data('subsection-order', $this.data('nav-subsection'));
    subsection.c.removeClass("active in-review");
    subsection.n.addClass("active").removeClass('subsection-done');
    subsection.count = subsection.n.data("subsection-order");

    // view
    $(Wizard.settings.view_el).removeClass('active');
    view.n = subsection.n.find(Wizard.settings.view_el + ':first');
    view.n.addClass('active').removeClass('done');
    view.count = view.n.data("view");
  }

  // go to section/subsection from nav
  $(document).on('click', '.nav-subsection', function () {
    let el = $(this);
    devnav(el);
  });

  // go to section in nav
  $(document).on('click', '.nav-section-title', function () {
    let el = $(this),
      this_section = el.closest('.nav-section').data('nav-section');
    Wizard.go_section(this_section);

  });



  $(document).on('click', '#dev_nav_btn', function () {
    var val = $('#dev_nav_input').val();
    Wizard.get_view(val);
  });

  /**
   * Remove the cookies for input fields and view count
   */
  function remove_cookies() {
    Cookies.remove('input_fields');
    Cookies.remove('view_count');
  }

  $('#dev_nav_delete_cookies').click(function (e) {
    e.preventDefault();
    $(this).after('<p class="dev-nav__toast">Cookies Removed</p>');
    $('.dev-nav__toast').ready(function () {
      setTimeout(function () {
        $('.dev-nav__toast').fadeOut(150, function () {
          $(this).remove();
        });
      }, 1000);
    });
    remove_cookies();
  });
}
