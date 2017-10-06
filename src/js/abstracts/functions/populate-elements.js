/**
 * Populate selects and other elements from API or variable
 * @arg {Object} config - Options to override default settings and configure elements
 * @arg {string} config.target - Target &lt;select&gt; element (e.g. '.js-currencies')
 * @arg {string} config.object - Object to pull data from for &lt;option&gt; elements
 * @arg {string} [config.val] - Object key to be used for  value
 * @arg {string|array} [config.text] - Object key(s) to be used for &lt;option&gt; text
 * @arg {string} [config.join=' '] - Text to join 'text' array with (defaults to single space)
 * @arg {string} [config.suffix=''] - Text to append to end of &lt;option&gt;
 */
function populate_from_source(config) {
  let settings = {
    target: '',
    source: '',
    element: 'option',
    val: false,
    text: false,
    join: ' ',
    suffix: '',
  };
  $.extend(true, settings, config);
  let elements = settings.element === 'option' ? '<option></option>' : '',
    element_value = '',
    element_text = [];
  for (let key in settings.source) {
    element_value = settings.val ? settings.source[key][settings.val] : settings.source[key];
    if (settings.text) {
      settings.text = typeof settings.text === 'string' ? [settings.text] : settings.text;
      for (let i = 0; i < settings.text.length; i++) {
        element_text.push(settings.source[key][settings.text[i]]);
      }
      element_text = element_text.join(settings.join);
    } else {
      element_text = settings.source[key];
    }
    elements += `<option value="${element_value}">${element_text}${settings.suffix}</option>`;
    element_text = [];
  }
  $(settings.target).html(elements);
}

/**
 * Populate Checkboxes / Evidence Fields
 @arg {string} target - jQuery target element (e.g. '.js-evidence-basic')
 @arg {array} source - Source array to pull values
 @arg {array} source - Source array to pull values
 @arg {string} name - Name attribute for generated element
 @arg {string} [name='pills__input'] - Class attribute for generated element
 */
function populate_checkboxes(target, source, name, class_name = 'pills__input') {
  let markup = '', val, text, id, val_id;
  for (let i = 0; i < source.length; i++) {
    val = source[i];
    val_id = val.toLowerCase();
    val_id = val_id.replace(/ /g, "_");
    id = name + '_' + val_id;
    markup += `<input type="checkbox" class="${class_name}" name="${name}" id="${id}" value="${val}"/>`;
  }
  $(target).html(markup);
}
