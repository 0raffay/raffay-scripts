class RFvalidateForm {
  constructor({
    form = null,
    inputs = null,
    button = null,
    specialFields = "validate-regex",
    validateCheckbox = true,
    errorClass = "error",
    disableClass = "disabled",
    exclude = "exclude",
  },
    success
  ) {
    if (!form) {
      console.error(
        "RfvalidateForm requires a form element. Please provide it's selector"
      );
      return;
    }
    this.form = document.querySelector(form);

    if (this.form == null) {
      return;
    }

    this.inputs = [];
    this.specialFields = [];
    this.button = this.setButton(button);
    this.errorClass = errorClass;
    this.disableClass = disableClass;
    this.success = success;
    this.exclude = exclude;
    this.validateCheckbox = validateCheckbox;
    this.checkboxes = [];

    this.form.setAttribute("novalidate", "true");

    this.setBasicInputs();

    if (inputs) {
      this.setUserInputs(inputs);
    }

    if (this.validateCheckbox) {
      this.setCheckbox();
    }

    this.setSpecialFields(specialFields);

    this.valid = false;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.checkRegexValidity();
      this.checkIfEmpty();
      this.checkIfChecked();

      if (this.valid) {
        this.success(this.form);
      }
    });

    this.inputs.forEach((i) => {
      i.addEventListener("input", (e) => {
        this.checkIfEmpty(e.target);
      });
    });

    if (this.specialFields && this.specialFields.length) {
      this.specialFields.forEach((s) => {
        s.input.addEventListener("input", (e) => {
          this.checkRegexValidity(s.input, s.regex);
        });
      });
    }

    if (this.checkboxes && this.checkboxes.length) {
      this.checkboxes.forEach(c => {
        c.addEventListener("input", (e) => {
          this.checkIfChecked(c);
        })
      })
    }
  }

  checkIfChecked(checkbox) {
    if (checkbox) {
      if (!checkbox.checked) {
        this.addErrorClass(checkbox);
        this.setValid();
      } else {
        this.removeErrorClass(checkbox);
        this.setValid();
      }
      return;
    }

    if (!this.checkboxes || !this.checkboxes.length) {
      return;
    }
    this.checkboxes.forEach(checkbox => {
      if (!checkbox.checked) {
        this.addErrorClass(checkbox);
        this.setValid();
        return;
      }
      this.removeErrorClass(checkbox);
      this.setValid();
      return;
    })
  }

  checkRegexValidity(input, regex) {
    if (input && regex) {
      const value = input.value;
      if (!regex.test(value)) {
        this.addErrorClass(input);
        this.setValid();
        return;
      }
      this.removeErrorClass(input);
      this.setValid();
      return;
    }

    this.specialFields.forEach((s) => {
      if (!s.regex.test(s.input.value)) {
        this.addErrorClass(s.input);
        this.setValid();
        return;
      }
      this.removeErrorClass(s.input);
      this.setValid();
    });
  }

  checkIfEmpty(input) {
    if (input) {
      if (input.value == "") {
        this.addErrorClass(input);
        this.setValid();
        return;
      }
      this.removeErrorClass(input);
      this.setValid();
      return;
    }

    this.inputs.forEach((i) => {
      if (i.value == "") {
        this.addErrorClass(i);
        this.setValid();
        return;
      }
      this.removeErrorClass(i);
      this.setValid();
      return;
    });
  }

  checkErrorClass(input) {
    return input.classList.contains(this.errorClass);
  }

  addErrorClass(input) {
    input.classList.add(this.errorClass);
  }

  removeErrorClass(input) {
    input.classList.remove(this.errorClass);
  }

  removeField(input) {
    if (Array.isArray(input)) {
      this.inputs.forEach(i => {
        input.forEach((s) => {
          if (i == s) {
            this.inputs.splice(this.inputs.indexOf(i), 1);
          }
        });
      })
      return;
    }
    this.inputs.forEach(i => {
      if (i == input) {
        this.inputs.splice(this.inputs.indexOf(i), 1)
      }
    })
    this.specialFields.forEach(i => {
      if (i.input == input) {
        this.specialFields = this.specialFields.filter(i => i.input !== input);
      }
    })
  }

  addRegexField(input, regex) {
    this.removeField(input);
    const f = {
      input: input,
      regex: new RegExp(regex),
    }
    this.specialFields.push(f);
  }

  setValid() {
    const inputs = [
      ...this.inputs,
      ...this?.specialFields.map((i) => i.input),
      ...this.checkboxes
    ];

    const validityStatus = inputs.every((i) => {
      return !this.checkErrorClass(i);
    });
    this.valid = validityStatus;
  }

  setBasicInputs() {
    const checkIncludeStatus = (input) => {
      return !input.classList.contains(this.exclude) &&
        !input.hasAttribute(this.exclude) &&
        !(input.type === "hidden");
    }
    const inputs = this.form.querySelectorAll(
      "input[type='text'], input[type='email'], input[type='number'], input[type='date'], select, textarea, input[type='file'], input[type='password']"
    );
    if (!inputs.length) {
      console.error("No input elements found in form.", this.form)
      return;
    }
    inputs.forEach((i) => {
      if (checkIncludeStatus(i)) {
        this.inputs.push(i);
      }
    });

    const specialFields = [{
      input: this.form.querySelector("input[type='tel']"),
      regex: /^\d{8,}$/
    },
    {
      input: this.form.querySelector("input[type='email']"),
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    ]
    specialFields.forEach(s => {

      if (s.input && checkIncludeStatus(s.input)) {
        this.addRegexField(s.input, s.regex);
      }
    })
  }

  setUserInputs(inputSelector) {
    const inputs = this.form.querySelectorAll(inputSelector);
    if (!inputs.length) {
      console.error("No input elements found with selector.")
      return;
    }
    inputs.forEach((i) => {
      const alreadyIncluded = this.inputs.indexOf(i);
      if (!alreadyIncluded) {
        this.inputs.push(i);
      }
    });
  }

  setSpecialFields(specialFieldSelector) {
    const specialFields = this.form.querySelectorAll(
      `[${specialFieldSelector}]`
    );
    specialFields.forEach((s) => {
      const include = s.getAttribute(specialFieldSelector);
      if (include !== "") {
        this.addRegexField(s, new RegExp(s.getAttribute(specialFieldSelector)))
        return;
      }
      this.inputs.push(s);
    });
  }

  setCheckbox() {
    const checkboxes = Array.from(this.form.querySelectorAll('input[type="checkbox"]'));

    if (!checkboxes || !checkboxes.length) {
      return;
    }

    checkboxes.forEach(checkbox => {
      this.checkboxes.push(checkbox);
    });
  }

  setButton(buttonSelector) {
    return buttonSelector ?
      this.form.querySelector(buttonSelector) :
      this.form.querySelector("button[type='submit']");
  }
}
const validate = new RFvalidateForm({ form: "#form" }, function () {
	alert("working peacefullyy");
});
