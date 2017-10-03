/**
 * (For development purposes only.)
 * @namespace
 */
function dev_tools() {

  /**
   * Navigate through subsection and views from nav.
   * @arg {Object} $this - Pass the $(this) variable from a jQuery event.
   */
  function devnav($this) {
    // section
    $(section.el).removeClass('active');
    section.c = $(section.el + '.active');
    section.n = $data('section', $this.closest('[data-nav-section]').data('nav-section'));
    section.c.removeClass('active');
    section.n.addClass('active');
    section.count = section.n.data('section');

    // subsection
    $(subsection.el).removeClass('active');
    subsection.c = $(subsection.el + '.active');
    subsection.n = $data('subsection-order', $this.data('nav-subsection'));
    subsection.c.removeClass("active in-review");
    subsection.n.addClass("active").removeClass('subsection-done');
    subsection.count = subsection.n.data("subsection-order");

    // view
    $(view.el).removeClass('active');
    view.n = subsection.n.find(view.el + ':first');
    view.n.addClass('active').removeClass('done');
    view.count = view.n.data("view");

    nav_track_cookie();

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
    nav_track_cookie();

  });



  $(document).on('click', '#dev_nav_btn', function () {
    var val = $('#dev_nav_input').val();
    Wizard.get_view(val);
  });

  /**
   * Remove the cookies for input fields and view count
   */
  function remove_cookies() {
    Cookies.remove(Wizard.settings.cookies.input);
    Cookies.remove(Wizard.settings.cookies.view);
    localStorage.removeItem(Wizard.settings.cookies.input);
    localStorage.removeItem(Wizard.settings.cookies.view);
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
