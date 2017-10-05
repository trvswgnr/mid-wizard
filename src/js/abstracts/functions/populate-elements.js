/**
 * Populate selects from APIs or variables
 * @arg {string} target - Target &lt;select&gt; element (e.g. '.js-currencies')
 * @arg {string} object - Object to pull data from for &lt;option&gt; elements
 * @arg {string} [val] - Object key to be used for  value
 * @arg {string|array} [text] - Object key(s) to be used for &lt;option&gt; text
 * @arg {string} [join=' '] - Text to join 'text' array with (defaults to single space)
 * @arg {string} [suffix=''] - Text to append to end of &lt;option&gt;
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
    option_value = '',
    option_text = [];
  for (let key in settings.source) {
    option_value = settings.val ? settings.source[key][settings.val] : settings.source[key];
    if (settings.text) {
      settings.text = typeof settings.text === 'string' ? [settings.text] : settings.text;
      for (let i = 0; i < settings.text.length; i++) {
        option_text.push(settings.source[key][settings.text[i]]);
      }
      option_text = option_text.join(settings.join);
    } else {
      option_text = settings.source[key];
    }
    elements += `<option value="${option_value}">${option_text}${settings.suffix}</option>`;
    option_text = [];
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
