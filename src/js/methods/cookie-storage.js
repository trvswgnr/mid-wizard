/**
 * Store and get input object in a cookie.
 */
Wizard.cookies = function () {

  var cookie_name = 'input_taw';

  /**
   * Set/update values of input object from form and store in cookie.
   */
  function set() {
    input = get_form_data(document.getElementById('wizard_form'));

    for (let key in input) {
      if ($.isEmptyObject(input[key])) {
        delete input[key];
      }
    }

    // store the input as a cookie
    Cookies.set(cookie_name, JSON.stringify(input));
  }

  // set cookie on input change
  $(document).on('change', 'input, select', function () {
    set();
  });

  /**
   * Get the stored cookie and prepopulate input fields.
   */
  function get() {

    let arr_length = 0,
      matching_checkbox = '',
      matching_radio = '';

    input = Cookies.get(cookie_name);
    input = !input ? {} : JSON.parse(input);

    for (var key in input) {

      // check if empty object (avoid errors)
      input[key] = $.isEmptyObject(input[key]) ? '' : input[key];

      // all inputs except radios and checks get their values changed
      $('[name="' + key + '"]').not('[type="radio"], [type="checkbox"]').val(input[key]);

      // radios get checked
      matching_radio = $('[type="radio"][name="' + key + '"][value="' + input[key] + '"]');
      matching_radio.prop('checked', true);

      // pills get active class to represent input state
      matching_radio.next('.pills__option').addClass('is-active');

      // check if the variable is an array (we only want to affect checkboxes)
      arr_length = input[key].constructor === Array ? input[key].length : 0;
      for (let i = 0; i < arr_length; i++) {
        matching_checkbox = $('[name="' + key + '"][value="' + input[key][i] + '"]');
        matching_checkbox.attr('checked', 'checked');
        matching_checkbox.next('.pills__option').addClass('is-active');
      }
    }
    console.log(input);
  }

  // get cookie and pre-fill form on page ready
  $(document).ready(get());
}
