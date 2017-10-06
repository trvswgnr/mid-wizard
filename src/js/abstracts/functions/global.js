/* GLOBAL FUNCTIONS
------------------------------------------------- */
// @NOTE: Make sure these are added to the jshint/jslint config file

/**
 * Get element(s) using jQuery by data attribute and value.
 * @arg {string} data - the data-attribute (don't include 'data-', just the attribute.)
 * @arg {string} [val=''] = the value for the data attribute.
 */
function $data(data, val = '') {
  var x = val === '' ? $("[data-" + data + "]") : $("[data-" + data + '="' + val + '"]');
  return x;
}

/**
 * Get element(s) using jQuery by any attribute and value.
 * @arg {string} attr - The attribute to look for.
 * @arg {string} [val=''] = the value for the data attribute.
 */
function $attr(attr, val = '') {
  var x = val === '' ? $("[" + attr + "]") : $("[" + attr + '="' + val + '"]');
  return x;
}

/**
 * Change text inside an element with a matching 'name' attribute from input tag
 * @arg {string} [data_attribute='dynamic-text'] - the data-attribute to look for a matching name attribute for and replace text (don't include 'data-', just the attribute.)
 * @example
 * // Will replace span tag with input value
 * <input type="text" name="firstname" value="John Doe">
 * <span data-dynamic-text="firstname">{{firstname}} (doesn't matter what's in here)</span>
 * // Result is <span data-dynamic-text="firstname">John Doe</span>
 */
function dynamic_text(data_attribute = 'dynamic-text') {
  var el, this_data, input_val;
  $("[data-" + data_attribute + "]").each(function () {
    el = $(this);
    this_data = el.data(data_attribute);
    input_val = $('[name="' + this_data + '"]').val();
    if (input_val.length > 0) {
      $data(data_attribute, this_data).text(input_val);
    }
  });
}

/**
 * Change the labels when the subsection is under review
 * @arg {boolean} x - specify whether the label text should match the placeholder of the input (true) or match the regular label text (false).
 */
function change_label_text(x) {
  var label = $("input, select").not('[type="radio"], [type="checkbox"]').prev("label");

  $.each(label, function () {
    var og_text,
      new_text,
      el = $(this),
      attr_for = el.attr("for");
    if (x === true) {
      (og_text = el.html()), (new_text = $("#" + attr_for).attr(
        "placeholder"
      ));
      el.text(new_text).attr("data-guide-text", og_text);
      el.append('<div class="edit-field"></div>');
    } else {
      new_text = el.data("guide-text");
      el.html(new_text);
      $(".edit-field").remove();
    }
  });
}

/**
 * Flatten a nested array with recursion.
 * @arg {Array} arr An array containing nested arrays.
 * @example
 * // returns ["A", "B", "C", "D", "E", "F"]
 * flatten_array(["A", ["B", ["C", "D"], "E"], "F"]);
 */
function flatten_array(arr) {
  var is_array = Object.prototype.toString.call(arr) === '[object Array]';

  if (is_array && arr.length > 0) {
    var head = arr[0];
    var tail = arr.slice(1);

    return flatten_array(head).concat(flatten_array(tail));
  } else {
    return [].concat(arr);
  }
}

/**
 * Disable tabbing/entering off form.
 */
$("#wizard_form button").on('keydown', function (e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode == 9) {
    e.preventDefault();
  }
});

$("#wizard_form").on('keydown', function (e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode == 13) {
    e.preventDefault();
  }
});


/**
 * Track position in nav from cookie, or click
 */
function nav_track_cookie() {
  let active_subsection_number = $('.subsection.active').data('subsection-order'),
    active_section_number = $('section.active').data('section');
//  $data('nav-subsection').removeClass('done active');
//  $data('nav-section').removeClass('active');
  $('.wizard__nav .is-first').addClass('active');
  for (let i = 0; i < active_subsection_number; i++) {
    $data('nav-subsection', i).addClass('done');
    $data('nav-subsection', i + 1).addClass('active');
    $data('nav-section', active_section_number).addClass('active');
    $data('nav-section', active_section_number).find('.nav-section-title').addClass('active');
  }
}

