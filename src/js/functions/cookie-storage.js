/**
 * Store and get input object in a cookie.
 */
Wizard.cookies = function() {
  // set cookie on input change
  $('input').on('change', function () {
  input = get_form_data(document.getElementById('wizard_form'));
  Cookies.set("input_fields", JSON.stringify(input));
});

  // add inputs fields from cookie on load
  input = Cookies.get("input_fields");
  input = !input ? {} : JSON.parse(input);
  for (var key in input) {
    $('[name="' + key + '"]').not('[type="radio"], [type="checkbox"]').val(input[key]);
  }
}
