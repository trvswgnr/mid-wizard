Object.assign = function () {
  for (var i = 1; i < arguments.length; i++)
    for (var key in arguments[i])
      if (arguments[i].hasOwnProperty(key)) {
        if (typeof arguments[0][key] === 'object' &&
          typeof arguments[i][key] === 'object')
          Object.assign(arguments[0][key], arguments[i][key]);
        else
          arguments[0][key] = arguments[i][key];
      }
  return arguments[0];
}

function babel_test(x = 1, z = 2) {
  let n = {
      a: 5
    },
    b = {
      a: 6
    };
  Object.assign(n, b);
  console.log(n)
}

babel_test();
/* GLOBAL FUNCTIONS
------------------------------------------------- */
// @NOTE: Make sure these are added to the jshint/jslint config file

// get element(s) by data attribute and value
function $data(data, val) {

  return $("[data-" + data + '="' + val + '"]');
}

// apply dynamic text for things like {{name}}, etc...
function dynamic_text() {

  var el, this_data, input_val;
  $("[data-dynamic-text]").each(function () {
    el = $(this);
    this_data = el.data("dynamic-text");
    input_val = $('[name="' + this_data + '"]').val();
    $data("dynamic-text", this_data).text(input_val);
  });
}

// change the labels when the subsection is under review
function change_label_text(x) {

  var label = $("input, select").not('[type="radio"], [type="checkbox"]').prev("label");

  $.each(label, function () {
    var og_text,
      new_text,
      el = $(this),
      attr_for = el.attr("for");
    if (x === true) {
      (og_text = el.text()), (new_text = $("#" + attr_for).attr(
        "placeholder"
      ));
      el.text(new_text).attr("data-guide-text", og_text);
      el.append('<div class="edit-field"></div>');
    } else {
      new_text = el.data("guide-text");
      el.text(new_text);
      $(".edit-field").remove();
    }
  });
}
