/**
 * Specific conditional logic for autopopulating fields and/or skipping views.
 * @namespace
 */
function conditionals() {
  /**
   * If user is Primary Contact and/or Billing contact, skip those pages and fill in the form data automatically.
   * @arg {Object} $this - Pass the $(this) object from a jQuery event.
   */
  function primary_and_billing($this) {
    if (input.is_primary_contact === "yes" && input.is_billing_contact === "no") {
      Wizard.get_view("Billing Contact");
      $attr('name', 'primary_contact_firstname').val(input.user_first_name);
      $attr('name', 'primary_contact_lastname').val(input.user_last_name);
    } else if (input.is_primary_contact === "yes" && input.is_billing_contact === "yes") {
      view.count += 2;
      let this_subsection = $this.closest(Wizard.settings.subsection_el).find('.review-subsection');
      $attr('name', 'primary_contact_firstname').val(input.user_first_name);
      $attr('name', 'primary_contact_lastname').val(input.user_last_name);
      $attr('name', 'billing_contact_firstname').val(input.user_first_name);
      $attr('name', 'billing_contact_lastname').val(input.user_last_name);
      this_subsection.click();
    }
  }
  $('#primary_and_billing .get-next-view').click(function () {
    let el = $(this);
    primary_and_billing(el);
  });
}
