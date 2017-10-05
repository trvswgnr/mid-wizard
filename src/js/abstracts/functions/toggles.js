  /**
   * Replace checks with toggles
   */
function toggles() {
  $(".js-toggle").each(function() {
    let el = $(this),
      id = el.attr("id");
    el.replaceWith(`
      <div class="toggle" id="${id}" data-toggled="false">
        <div class="toggle__text"></div>
        <div class="toggle__switch"></div>
      </div>
    `);
  });

    $(".toggle").click(function () {
    let el = $(this),
        id = el.attr('id');
    if (el.attr('data-toggled') === "true") {
      el.attr("data-toggled", "false");
el.trigger('change');
      input[id] = 'false';
    } else {
      el.attr("data-toggled", "true");
      el.trigger('change');
      input[id] = 'true';
    }
    console.log(input);
  });
}
