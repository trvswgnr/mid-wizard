/**
 * GET FORM DATA
 * @arg {string} form - The form object to get input data from.
 */
// @NOTE: Make sure this is added to the jshint/jslint config file

function get_form_data(form) {

  function set_or_push(target, val) {
    var result = val;
    if (target) {
      result = [target];
      result.push(val);
    }
    return result;
  }

  var form_elements = $(form).find('input'),
    form_params = {},
    i = 0,
    elem;

  for (i = 0; i < form_elements.length; i += 1) {
    elem = form_elements[i];
    switch (elem.type) {
      case "submit":
        break;
      case "radio":
        if (elem.checked) {
          form_params[elem.name] = elem.value;
        }
        break;
      case "checkbox":
        if (elem.checked) {
          form_params[elem.name] = flatten_array(
            set_or_push(
              form_params[elem.name],
              elem.value
            )
          );
        }
        break;
      default:
        form_params[elem.name] = set_or_push(
          form_params[elem.name],
          elem.value
        );
    }
  }

  var selects = $(form).find('select');
  $.each(selects, function (i) {
    elem = $(this);

    form_params[elem.attr('name')] = $(this).val();
  });



  return form_params;
}
