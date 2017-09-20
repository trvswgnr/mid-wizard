/* CLICK / EVENT ACTIONS
------------------------------------------------- */
wizard.events = function () {

  // @NOTE: c - current, n - next, p - previous
  var section,
    subsection = {
      count: 1
    },
    view = {
      count: 1
    },
    btns = $("button");

  // prevent default button functionality
  btns.click(function (e) {
    e.preventDefault();
  });

  wizard.change_view(view, input);

  wizard.review_subsection(subsection, view);

  wizard.change_subsection(subsection, view, btns);

  wizard.nav_subsection(subsection, view);

  //  wizard.change_section(section, subsection, view, btns);

  // change section
//  $('button.review-section').click(function () {
//
//  });


/* Set Cookie
------------------------------------------------- */
$('input').on('change', function () {
  input = get_form_data(document.getElementById('wizard_form'));
  Cookies.set("input_fields", JSON.stringify(input));
});


  /* FORM MODIFIERS (affect hidden fields, etc...)
  ------------------------------------------------- */
  // multiselect with hidden checkboxes
  $('.multiselect__input').each(function () {
    var el = $(this),
      id = el.attr('id'),
        label = $('label[for="'+id+'"]');
    el.after('<label for="' + id + '" class="multiselect__option">' + el.val() + '<p>' + $('label[for="' + id + '"]').text() + '</p></label>');
    label.remove();
  });

  $('.multiselect__option').click(function () {
    var el = $(this);
    el.toggleClass('is-active');
  });

}
