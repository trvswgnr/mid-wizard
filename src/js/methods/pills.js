/* PILLS (affect hidden fields, etc...)
------------------------------------------------- */

/**
 * Add element to checkbox for easy styling
 */
function custom_checkboxes(block_class = 'pills') {
  $(`.${block_class}__input`).each(function () {
    let el = $(this),
      id = el.attr('id'),
      label = $(`label[for="${id}"]`),
      next_el = el.next(),
      has_tooltip = next_el.attr('class') === 'tooltip' ? true : false,
      tooltip_content = has_tooltip ? next_el.html() : '',
      tooltip = `<div class="tooltip__icon">
                  <div class="tooltip">${tooltip_content}</div>
                 </div>`;
    tooltip = has_tooltip ? tooltip : '';

    // display none on original inputs
    el.hide();

    if (has_tooltip) {
      next_el.remove();
    }

    // insert the markup after
    el.after(`
      <div class="${block_class}__option">
        ${el.val()}
        <p>${label.text()}</p>
        ${tooltip}
      </div>
    `);
    label.remove();
  });

  // checkbox pills active toggle
  $(`.${block_class}--checkboxes .${block_class}__option`).on('click', function () {
    var el = $(this);
    el.toggleClass('is-active');
    var this_input = el.prev('input');
    this_input.click();
  });

  // radio pills active toggle
  $(`.${block_class}--radios`).each(function () {
    let options_in_group = $(this).find(`.${block_class}__option`);
    options_in_group.on('click', function () {
      var el = $(this);
      var this_input = el.prev('input');
      this_input.click();
      options_in_group.removeClass('is-active');
      el.toggleClass('is-active');
    });
  });
}

custom_checkboxes('pills');


(function custom_file_upload() {
  let target = 'input[type="file"]';
  $(target).each(function () {
    let $this = $(this),
      custom = (
        `<div class="upload u-muted" data-upload="${$this.attr('id')}">+ Upload Document</div>`
      );
    $this.after(custom);
    //hide actual input
    $this.hide();
  });
  $('.upload').click(function(){
    let $this = $(this),
        linked_input = $(`#${$this.data('upload')}`);
    linked_input.click();
  });
  $(target).on('change',function(){
    let $this = $(this),
        filename = $this.val();
    filename = filename.match(/[^\/\\]+$/);
    $data('upload',$this.attr('id')).text(filename).removeClass('u-muted').addClass('is-active');
  });
}());

/**
 * Convert checkbox 'pills' to Select2 object.
 * @arg {Object} $this - Pass $(this) from jQuery event.
 */
function pills_to_select2($this) {
  let closest_subsection = $this.closest(subsection.el),
    selects_in_subsection = closest_subsection.find('.js-pills-select2');
  $.each(selects_in_subsection, function () {
    let el = $(this),
      el_html = el.prop('outerHTML'),
      inputs = el.find("input"),
      name = inputs.first().attr("name"),
      placeholder = el.attr('placeholder'),
      i,
      options = '',
      multiple = el.is('[multiple]') ? ' multiple="multiple"' : '';
    $.each(inputs, function () {
      let el = $(this),
        selected = el.prop('checked') ? ' selected' : '';
      options += `<option value="${el.val()}"${selected}>${el.val()}</option>`;
    });
    el.replaceWith(`
      <div id="${name}_select2_wrapper" class="js-select2-wrapper">
        <select class="js-select2" id="${name}_select2" name="${name}"${multiple}>
          ${options}
        </select>
      </div>
    `);
    $(`label[for=${name}_select2]`).html(`${placeholder} <div class="edit-field"></div>`);
  });

  /** Select2 Initialize */
  $(".js-select2").select2();
}

$(".review-subsection").click(function (e) {
  let el = $(this);
  e.preventDefault();
  setTimeout(function () {
    pills_to_select2(el);

  }, animation_time);

});
