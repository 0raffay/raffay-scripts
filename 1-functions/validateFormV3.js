class RFvalidateForm {
  constructor({ form = null, inputs = null, button = null, specialFields = "validation-regex", errorClass="error", disableClass="disabled" }, success) {
    if (!form) {
      console.error("RfvalidateForm requires a form element. Please provide it's selector");
      return;
    }
    this.form = document.querySelector(form);

    this.inputs = [];

    if (!inputs) {
      const inputs = this.form.querySelectorAll("input[type='text'], input[type='email'], input[type='number'], input[type='tel'], select");
      inputs.forEach((i) => {
        this.inputs.push(i);
      })
    } else {
      const inputs = this.form.querySelectorAll(inputs)
      inputs.forEach((i) => {
        this.inputs.push(i);
      })
    }

    this.errorClass = errorClass
    this.disableClass = disableClass
  }
}