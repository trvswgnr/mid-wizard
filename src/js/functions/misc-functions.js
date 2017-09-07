// get element(s) by data attribute and value
function $data(data, val) {
  return $("[data-" + data + '="' + val + '"]');
}

 // apply dynamic text for things like {{name}}, etc...
  function dynamic_text() {
    var el, this_data, input_val;
    $(".js-dynamic-text").each(function() {
      el = $(this);
      this_data = el.data("dynamic");
      input_val = $('[name="' + this_data + '"]').val();
      $data("dynamic", this_data).text(input_val);
    });
  }
