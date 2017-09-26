/* PILLS (affect hidden fields, etc...)
------------------------------------------------- */
// multiselect with hidden checkboxes
$('.pills__input').each(function () {
  let el = $(this),
    id = el.attr('id'),
    label = $('label[for="' + id + '"]'),
    next_el = el.next(),
    has_tooltip = next_el.attr('class') === 'tooltip' ? true : false,
    tooltip_content = has_tooltip ? next_el.html() : '',
    tooltip_el = '<div class="tooltip">' + tooltip_content + '</div>',
    tooltip = has_tooltip ? '<div class="tooltip__icon">' + tooltip_el + '</div>' : '';

  if (has_tooltip) {
    next_el.remove();
  }

  el.after('<div class="pills__option">' + el.val() + '<p>' + label.text() + '</p>' + tooltip + '</div>');
  label.remove();
});

// checkbox pills active toggle
$('.pills--checkboxes .pills__option').on('click', function () {
  var el = $(this);
  el.toggleClass('is-active');
  var this_input = el.prev('input');
  this_input.click();
});

// radio pills active toggle
$('.pills--radios').each(function () {
  let options_in_group = $(this).find('.pills__option');
  options_in_group.on('click', function () {
    var el = $(this);
    var this_input = el.prev('input');
    this_input.click();
    options_in_group.removeClass('is-active');
    el.toggleClass('is-active');
  });
});



/** Pills -> Select2 */
var pills_to_select2 = function () {
  function init(this_button) {
    let closest_subsection = this_button.closest('.subsection'),
      selects_in_subsection = closest_subsection.find('.js-pills-select2');
    $.each(selects_in_subsection, function () {
      let el = $(this),
        el_html = el.prop('outerHTML'),
        inputs = $(this).find("input"),
        name = inputs.first().attr("name"),
        i,
        options = '';
      $.each(inputs, function () {
        let el = $(this),
          selected = $(this).prop('checked') ? ' selected' : '';
        options += '<option value="' + $(this).val() + '"' + selected + '>' + $(this).val() + '</option>'
      });
      el.replaceWith(
        '<div id="' + name + '_select2_wrapper" class="js-select2-wrapper"><select class="js-select2" id="' + name + '_select2" name="' + name + '" multiple="multiple">' + options + '</select></div>'
      );
    });
    /** Select2 Initialize */
    $(".js-select2").select2();
  }
  return {
    init: init
  };
}();

$(".review-subsection").click(function (e) {
  let this_button = $(this);
  e.preventDefault();
  pills_to_select2.init(this_button);

});

//$(document).on('change', '.select2', function () {
//  let matching_select = $(this).prev('select'),
//    name = matching_select.attr('name'),
//    selected = $(this).find('.select2-selection__choice'),
//    options = matching_select.find('option');
//  $('select[name="' + name + '"] option').removeAttr('selected');
//  $.each(selected, function () {
//    $('option[value="' + $(this).attr('title') + '"]').createAttribute('selected');
//  });
//});
