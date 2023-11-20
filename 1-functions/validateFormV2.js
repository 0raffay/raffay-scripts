function validateForm(options, action) {
    let errorClass = options.errorClass || "error";
    let disableClass = options.disableClass || "disabled";

    let isValid = false;
    let button = $(options.button);
    let inputs = $(options.inputs);

    let specialFields = options.specialFields.selector;

    function checkInputs(_this) {
        let isSpecial = undefined;

        function checkIfSpecialFields(input) {
            isSpecial = input.attr(specialFields) !== undefined;
            let regexString = input.attr(specialFields);

            if (isSpecial) {
                let regex = new RegExp(regexString);
                validateSpecialFields(input, regex);
            }
        }

        function validateSpecialFields(field, regex) {
            let fieldValue = field.val();
            let test = regex.test(fieldValue) && fieldValue !== "";
            if (!test) {
                field.addClass(errorClass);
            } else {
                field.removeClass(errorClass);
            }
        }

        if (_this) {
            checkIfSpecialFields(_this);
            if (!isSpecial) {
                if (_this.val() == "") {
                    _this.addClass(errorClass);
                } else {
                    _this.removeClass(errorClass);
                }
            }
        } else {
            inputs.each(function () {
                checkIfSpecialFields($(this));
                if (!isSpecial) {
                    if ($(this).val() == "") {
                        $(this).addClass(errorClass);
                    } else {
                        $(this).removeClass(errorClass);
                    }
                }
            });
        }
    }

    function checkErrorClass() {
        isValid = inputs
            .toArray()
            .every((input) => !$(input).hasClass(errorClass));

        if (isValid) {
            button.removeClass(disableClass);
        }
    }

    inputs.on("change", function () {
        checkInputs($(this));
        checkErrorClass();
    });

    button.on("click", function (e) {
        e.preventDefault();
        checkInputs();
        checkErrorClass();

        if (isValid) {
            action();
        } else {
            $(this).addClass(disableClass);
        }
    });
}

validateForm(
    {
        button: "[data-submit]",
        inputs: "[data-validate]",
        specialFields: {
            selector: 'validate-regex',
        },
        errorClass: "error",
        disableClass: "disabled",
    },
    function () {
        alert("working peacefullty");
    }
);


let example =
    `    <div class="form">
<input data-validate type="text" placeholder="name">
<input data-validate validate-regex="^\d{10}$" type="tel" placeholder="telephone">
<input data-validate validate-regex="^[^\s@]+@[^\s@]+\.[^\s@]+$" type="email" placeholder="Email">
<input data-validate validate-regex="^[1-9]\d*$" type="number" placeholder="Custom Number input">
<button data-submit>Submit Form</button>
</div>`;