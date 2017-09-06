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
