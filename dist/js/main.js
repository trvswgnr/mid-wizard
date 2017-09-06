  function set_or_push(target, val) {
    var result = val;
    if (target) {
      result = [target];
      result.push(val);
    }
    return result;
  }

  function get_form_data(form) {
    var form_elements = form.elements,
      form_params = {},
      i = 0,
      elem;

    for (i = 0; i < form_elements.length; i += 1) {
      elem = form_elements[i];
      switch (elem.type) {
        case "submit":
          break;
        case "radio":
          if (elem.checked) {
            form_params[elem.name] = elem.value;
          }
          break;
        case "checkbox":
          if (elem.checked) {
            form_params[elem.name] = set_or_push(
              form_params[elem.name],
              elem.value
            );
          }
          break;
        default:
          form_params[elem.id] = set_or_push(
            form_params[elem.name],
            elem.value
          );
      }
    }
    return form_params;
  }

/* FORM VALIDATION
------------------------------------------------- */

  $('#wizard_form input[type="text"]').blur(function () {
    var input_length = $(this).val().length;
    if (input_length < 1) {
      $(this).after('<div>Please enter valid text.</div>');
      return false;
    } else {
      return true;
    }
  });

var mid_wizard = (function () {
  "use strict";

  function $data_find(x, y) {
    return $("[data-" + x + '="' + y + '"]');
  }

  var settings = {};

  function init(options) {
    var $fieldset_tag,
      $section_tag,
      inputs = {},
      current_view = 1,
      previous_view = 0,
      current_section = 1,
      previous_section = 0,
      is_last_fieldset = false,
      fieldsets_in_section,
      fieldset_number,
      fieldsets_in_prev_section,
      params;

    function change_view(curr, prev) {
      $data_find("view", curr).show().addClass("is-active");
      $data_find("view", prev).hide().removeClass("is-active");
    }

    function change_section(curr, prev) {
      $data_find("section", curr).addClass("is-active");
      $data_find("section", prev).removeClass("is-active");
    }

    function replace_dynamic_text() {
      var name;
      name = inputs.first_name;
      $(".js-dynamic-text-name").text(name);
    }

    settings = $.extend(settings, options);

    $section_tag = $(".js-section");

    $fieldset_tag = $(".js-fieldset");

    $.each($section_tag, function (s_i) {
      var $this_fieldset_tags;
      $(this).attr("data-section", s_i + 1);
      $this_fieldset_tags = $(this).find(".js-fieldset");
      $.each($this_fieldset_tags, function (f_i) {
        $(this).attr("data-fieldset", f_i + 1);
      });
    });

    $.each($fieldset_tag, function (i) {
      $(this).attr("data-view", i + 1);
    });

      $data_find("view", 1).show().addClass("is-active");
      $data_find("section", 1).addClass("is-active");
      $(".js-previous-view").hide();



    /* CONTROL VIEW CLICK EVENTS
    ------------------------------------------------- */
    $(".js-next-view").click(function () {
      $(this).text("Next Step").removeClass("js-next-section");
      $(".js-previous-view").show();
      previous_view = current_view;
      current_view += 1;
      current_section = $data_find("view", current_view)
        .parents(".js-section")
        .data("section");
      previous_section = $data_find("view", current_view)
        .parents(".js-section")
        .prev(".js-section")
        .data("section");
      if (current_view > $fieldset_tag.length) {
        current_view = $fieldset_tag.length;
        previous_view = $fieldset_tag.length - 1;
      }
      if (current_section > $section_tag.length) {
        current_section = $section_tag.length;
        previous_section = $section_tag.length - 1;
      }
      fieldset_number = $data_find("view", current_view).data("fieldset");
      fieldsets_in_section = $data_find("section", current_section).find(
        ".js-fieldset"
      );
      fieldsets_in_prev_section = $data_find("section", previous_section).find(
        ".js-fieldset"
      );
      is_last_fieldset = fieldset_number === fieldsets_in_section.length ? true : false;
      fieldsets_in_prev_section.removeClass("u-block");
      if (is_last_fieldset) {
        $(this).hide();
        $(".js-review-section").show();
      }
      change_section(current_section, previous_section);
      change_view(current_view, previous_view);
      params = get_form_data(document.getElementById("wizard_form"));
      inputs = JSON.parse(JSON.stringify(params, null, " "));
      replace_dynamic_text();
    });

    $(window).keypress(function (e) {
      if (e.which === 13) {
        e.preventDefault();
        $(".js-next-view").click();
      }
    });

    $(".js-previous-view").click(function () {
      $(".js-guide-text").show();
      previous_view = current_view;
      current_view -= 1;
      current_section = $data_find("view", current_view)
        .parents(".js-section")
        .data("section");
      previous_section = $data_find("view", current_view)
        .parents(".js-section")
        .next(".js-section")
        .data("section");
      console.log(previous_section);
      if (current_view <= 1) {
        current_view = 1;
        previous_view = 2;
        $(this).hide();
      }
      if (current_section < 1) {
        current_section = 1;
        previous_section = 2;
      }
      fieldset_number = $data_find("view", current_view).data("fieldset");
      fieldsets_in_section = $data_find("section", current_section).find(".js-fieldset");
      fieldsets_in_prev_section = $data_find("section", previous_section).find(".js-fieldset");
      is_last_fieldset = fieldset_number === fieldsets_in_section.length ? true : false;
      fieldsets_in_section.removeClass("u-block");
      if (is_last_fieldset) {
        $(".js-next-view").hide();
        $(".js-review-section").show();
      } else {
        $(".js-next-view").show();
        $(".js-review-section").hide();
      }
      change_view(current_view, previous_view);
      change_section(current_section, previous_section);
    });

    $(".js-review-section").click(function () {
      fieldsets_in_section.addClass("u-block");
      $(".js-guide-text").hide();
      $(this).hide();
      $(".js-previous-view").hide();
      $(".js-next-view")
        .show()
        .text("Next Section")
        .addClass("js-next-section");
    });
  }

  return {
    init: init
  };
})();

mid_wizard.init();

//# sourceMappingURL=main.js.map
