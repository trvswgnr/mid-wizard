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
