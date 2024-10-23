
class RFvalidateForm {
  constructor(
    {
      form = null,
      inputs = null,
      button = null,
      specialFields = "validate-regex",
      validateCheckbox = true,
      validateRadio = true,
      errorClass = "error",
      disableClass = "disabled",
      exclude = "exclude",
      event = "submit",
      onError = null,
    },
    success
  ) {
    if (!form) {
      console.error(
        "RfvalidateForm requires a form element. Please provide its selector"
      );
      return;
    }
    this.form = document.querySelector(form);

    if (this.form == null) {
      return;
    }

    this.inputs = [];
    this.specialFields = [];
    if (button) {
      this.button = this.setButton(button);
    }
    this.errorClass = errorClass;
    this.disableClass = disableClass;
    this.success = success;
    this.exclude = exclude;
    this.validateCheckbox = validateCheckbox;
    this.validateRadio = validateRadio;
    this.checkboxes = [];
    this.event = event;
    this.values = {};
    this.specialFieldSelector = specialFields;
    this.userInputSelector = inputs;

    if (onError) {
      this.onError = onError;
    }

    this.form.setAttribute("novalidate", "true");

    this.setBasicInputs();

    if (this.userInputSelector) {
      this.setUserInputs(this.userInputSelector);
    }

    if (this.validateCheckbox) {
      this.setCheckbox();
    }

    if (this.validateRadio) {
      this.setRadioGroups();
    }

    this.setSpecialFields(this.specialFieldSelector);

    this.valid = false;

    this.#addEventListeners();
  }
  collectCurrentValues() {
    this.inputs.forEach((input) => {
      this.values[input.name] = input.value;
    });
    this.checkboxes.forEach((checkbox) => {
      this.values[checkbox.name] = checkbox.checked;
    });
    this.radioGroups.forEach((group) => {
      const selectedRadio = group.find((radio) => radio.checked);
      if (selectedRadio) {
        this.values[selectedRadio.name] = selectedRadio.value;
      }
    });
    this.specialFields.forEach((s) => {
      this.values[s.input.name] = s.input.value;
    });
  }

  handleSuccess() {
    this.collectCurrentValues();
    this.triggerValidation();
    if (this.valid) {
      if (typeof this.success == "function") {
        this.success(this);
      }
    }

    return this.valid;
  };

  #addEventListeners() {
    if (this.event == "submit") {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSuccess();
      });
    } else {
      this?.button?.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleSuccess();
      });
    }

    this.inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        this.values[e.target.name] = e.target.value; // Save the value using e.target
        this.checkIfEmpty(e.target);
      });
    });

    if (this.specialFields && this.specialFields.length) {
      this.specialFields.forEach((s) => {
        s.input.addEventListener("input", (e) => {
          this.values[e.target.name] = e.target.value; // Save the value using e.target
          this.checkRegexValidity(e.target, s.regex);
        });
      });
    }

    if (this.checkboxes && this.checkboxes.length) {
      this.checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("input", (e) => {
          this.values[e.target.name] = e.target.checked; // Save the checked status using e.target
          this.checkIfChecked(e.target);
        });
      });
    }

    if (this.radioGroups && this.radioGroups.length) {
      this.radioGroups.forEach((group) => {
        group.forEach((radio) => {
          radio.addEventListener("change", (e) => {
            this.values[e.target.name] = e.target.value; // Save the selected value using e.target
            this.checkRadioGroups();
          });
        });
      });
    }
  }



  triggerValidation() {
    this.checkIfEmpty();
    this.checkRegexValidity();
    this.checkIfChecked();
    this.checkRadioGroups();
    return this.valid;
  }

  reinitialize() {
    // Re-get all inputs, special fields, checkboxes, and radio groups
    this.inputs = [];
    this.specialFields = [];
    this.checkboxes = [];
    this.radioGroups = [];

    // Re-set basic inputs
    this.setBasicInputs();

    if (this.userInputSelector) {
      this.setUserInputs(this.userInputSelector);
    }

    // Re-set special fields
    this.setSpecialFields(this.specialFieldSelector);

    // Re-set checkboxes
    this.setCheckbox();

    // Re-set radio groups
    this.setRadioGroups();

    // Re-add event listeners
    this.#addEventListeners();
  }

  checkRadioGroups() {
    if (!this.radioGroups.length) {
      return;
    }

    this.radioGroups.forEach((group) => {
      const isGroupChecked = group.some((radio) => radio.checked);
      group.forEach((radio) => {
        if (!isGroupChecked) {
          this.addErrorClass(radio);
        } else {
          this.removeErrorClass(radio);
        }
      });
    });

    this.setValid();
  }

  setRadioGroups() {
    const radios = Array.from(this.form.querySelectorAll('input[type="radio"]'));
    const radioGroupsMap = {};

    radios.forEach((radio) => {
      const groupName = radio.name;
      if (!radioGroupsMap[groupName]) {
        radioGroupsMap[groupName] = [];
      }
      radioGroupsMap[groupName].push(radio);
    });

    this.radioGroups = Object.values(radioGroupsMap);
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
    this.checkboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        this.addErrorClass(checkbox);
        this.setValid();
        return;
      }
      this.removeErrorClass(checkbox);
      this.setValid();
      return;
    });
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
      this.inputs.forEach((i) => {
        input.forEach((s) => {
          if (i == s) {
            this.inputs.splice(this.inputs.indexOf(i), 1);
          }
        });
      });
      return;
    }
    this.inputs.forEach((i) => {
      if (i == input) {
        this.inputs.splice(this.inputs.indexOf(i), 1);
      }
    });
    this.specialFields.forEach((i) => {
      if (i.input == input) {
        this.specialFields = this.specialFields.filter((i) => i.input !== input);
      }
    });
  }

  addRegexField(input, regex) {
    this.removeField(input);
    const f = {
      input: input,
      regex: new RegExp(regex),
    };
    this.specialFields.push(f);
  }

  setValid() {
    const inputs = [
      ...this.inputs,
      ...this?.specialFields.map((i) => i.input),
      ...this.checkboxes,
      ...this.radioGroups?.flatMap(item => item)
    ];

    const validityStatus = inputs.every((i) => {
      return !this.checkErrorClass(i);
    });

    if (!validityStatus) {
      this.handleOnError();
    }

    this.valid = validityStatus;
  }

  handleOnError() {
    if (this.onError && typeof this.onError == "function") {
      this.onError(this);
    }
  }

  setBasicInputs() {
    const checkIncludeStatus = (input) => {
      return (
        !input.classList.contains(this.exclude) &&
        !input.hasAttribute(this.exclude) &&
        !(input.type === "hidden")
      );
    };
    const inputs = this.form.querySelectorAll(
      "input[type='text'], input[type='email'], input[type='number'], input[type='date'], select, textarea, input[type='file'], input[type='password']"
    );

    inputs.forEach((i) => {
      if (checkIncludeStatus(i)) {
        this.inputs.push(i);
      }
    });

    const specialFields = [
      {
        input: this.form.querySelector("input[type='tel']"),
        regex: /^\d{8,}$/,
      },
      {
        input: this.form.querySelector("input[type='email']"),
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      {
        input: this.form.querySelector("input[type='tel']"),
        regex: /^\d{8,}$/,
      },
    ];
    specialFields.forEach((s) => {
      if (s.input && checkIncludeStatus(s.input)) {
        this.addRegexField(s.input, s.regex);
      }
    });
  }

  setUserInputs(inputSelector) {
    const inputs = this.form.querySelectorAll(inputSelector);
    if (!inputs.length) {
      console.error("No input elements found with selector.");
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
    const specialFields = this.form.querySelectorAll(`[${specialFieldSelector}]`);
    specialFields.forEach((s) => {
      const include = s.getAttribute(specialFieldSelector);
      if (include !== "") {
        this.addRegexField(s, new RegExp(s.getAttribute(specialFieldSelector)));
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

    checkboxes.forEach((checkbox) => {
      this.checkboxes.push(checkbox);
    });
  }

  setButton(buttonSelector) {
    return buttonSelector
      ? this.form.querySelector(buttonSelector)
      : this.form.querySelector("button[type='submit']");
  }
}