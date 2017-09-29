/**
 * Pull options for Add a Merchant section from those selected in Create Your Account
 */
function add_mid_inputs() {
  $data('values').each(function () {
    let this_select = $(this),
      option_matches = $attr('name', this_select.data('values')).find('option:selected'),
      checkbox_matches = $('[name="' + this_select.data('values') + '"]:checked'),
      output_html = this_select.attr('placeholder').length > 0 ? '<option></option>' : '';

    // create an option for each matching <option>
    $.each(option_matches, function () {
      let this_match = $(this);
      output_html += '<option value=' + this_match.val() + '>' + this_match.text() + '</option>';
    });

    // create an option for each matching checkbox
    $.each(checkbox_matches, function () {
      let this_match = $(this);
      output_html += '<option value=' + this_match.val() + '>' + this_match.val() + '</option>';
    });
    this_select.html(output_html);
  });

}

$('.get-next-section, .nav-section').click(function () {
  add_mid_inputs();
});
