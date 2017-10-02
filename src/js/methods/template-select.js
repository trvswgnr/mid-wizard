/**
 * Template Select and Preview
 */
var template_select = (function () {
  $('.template-select').each(function () {
    let parent = $(this),
      templates = parent.find('.template-select__template');
    templates.click(function () {
      let $this = $(this),
        src = $this.find('img:first').attr('src'),
        preview = parent.find('.template-select__preview');
      $('.template-select__template').removeClass('is-active');
      $this.addClass('is-active');
      $('.template-select__preview').css('background-image', `url(${src})`);
      input[parent.attr('id')] = $this.attr('name');
      Cookies.set(Wizard.settings.cookies.input, input);
    });
  });

}());
