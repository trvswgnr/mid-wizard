  function set_or_push(target, val) {
    var result = val;
    if (target) {
      result = [target];
      result.push(val);
    }
    return result;
  }

  function get_form_data(form) {
    var form_elements = form.elements,
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
            form_params[elem.name] = set_or_push(
              form_params[elem.name],
              elem.value
            );
          }
          break;
        default:
          form_params[elem.id] = set_or_push(
            form_params[elem.name],
            elem.value
          );
      }
    }
    return form_params;
  }
