/* PILLS (affect hidden fields, etc...)
------------------------------------------------- */
// multiselect with hidden checkboxes
$('.pills__input').each(function () {
  var el = $(this),
    id = el.attr('id'),
    label = $('label[for="' + id + '"]');
  el.after('<label for="' + id + '" class="pills__option">' + el.val() + '<p>' + $('label[for="' + id + '"]').text() + '</p></label>');
  label.remove();
});

// checkbox pills active toggle
$('.pills--checkboxes .pills__option').on('click', function () {
  var el = $(this);
  el.toggleClass('is-active');
});

// radio pills active toggle
$('.pills--radios').each(function () {
  let options_in_group = $(this).find('.pills__option');
  options_in_group.on('click', function () {
    var el = $(this);
    options_in_group.removeClass('is-active');
    el.toggleClass('is-active');
  });
});
